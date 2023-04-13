#!/usr/bin/env python3
import os

cwd = os.getcwd()


def command_exists(name):
    """Check whether `name` is in the PATH"""
    from shutil import which
    return which(name) is not None


def check_dependencies():
    """Iterate `dependencies.csv`, checking whether each line exists
    on the system as an executable"""

    print("Checking required dependencies...")
    with open(f'{cwd}/dependencies.csv') as deps:
        for d in deps:
            d = d.strip()

            # Skip blank line and header
            valid_entry = d != "dependency_name" and d not in [
                    '\n', '\r\n'] and d != ''

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


########################
# Start of main script #
########################

check_dependencies()
build_db_schema()
