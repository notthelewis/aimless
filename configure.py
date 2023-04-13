#!/usr/bin/env python3

import os
from shutil import which

cwd = os.getcwd()


def command_exists(name):
    """Check whether `name` is in the PATH"""
    return which(name) is not None


def is_valid_csv_entry(L, Omitted):
    """Ensures L is not blank and is not `Omitted`"""
    return L != Omitted and L not in ['\n', '\r\n'] and L != ''


def check_dependencies():
    """Iterate `dependencies.csv`, checking whether each line exists
    on the system as an executable"""

    print("Checking required dependencies...")
    with open(f'{cwd}/dependencies.csv') as deps:
        for d in deps:
            d = d.strip()

            valid_entry = is_valid_csv_entry(d, "dependency_name")

            if not valid_entry:
                continue

            if command_exists(d) is False:
                print(f"{d} Isn't installed. Install to continue")
                exit(1)

    print("All dependencies met")


def build_db_schema():
    """Converts dbml schema to sql file, which can be inserted into the db"""

    # We can handle this dependency differently, as dbml2sql can be installed
    # using npm
    if not command_exists("dbml2sql"):
        print("Installing dbml2sql")
        os.system('npm i -g @dbml/cli')

    print("Converting dbml to sql")
    os.system(f'dbml2sql {cwd}/aimless/db/db-schema.dbml')


def build_container(container_name):
    """Builds Docker container from Dockefile in ./aimless/`container_name`"""

    path = f"{cwd}/{container_name}"

    tag = path.split('/')[-1]
    tag = f"aimless-{tag}"

    if not os.path.isdir(path):
        print(f"ERROR: {path} does not exist when trying to build: {tag}")
        exit(1)

    print(f"Building service: {tag}")

    try:
        if os.system(f"docker build -t {tag} {path}") != 0:
            raise Exception
    except Exception:
        print(f"Error occured whilst building: {tag}")
        exit(1)


def build_all_containers():
    """Builds all containers found in `./service-names.csv`"""
    with open(f"{cwd}/service-names.csv") as services:
        for C in services:
            C = C.strip()

            valid_service = is_valid_csv_entry(C, "service_name")

            # Skip blank lines and csv header
            if not valid_service:
                continue

            build_container(C)


########################
# Start of main script #
########################

check_dependencies()
build_db_schema()
build_all_containers()

os.system('docker compose up -d')
