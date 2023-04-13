from sys import platform
import subprocess as sp
import os

cwd = os.getcwd()

def check_dependency(dependency_file, to_check):
    for line in dependency_file:
        if line in to_check.strip():
            return (True, line)

    return (False, line)


def check_dependencies():
    if platform == "linux" or platform == "linux2" or platform == "darwin":
        print("Run ./configure.sh instead. This script is built for windows")
        return

    # ======================#
    # We must be on windows #
    # ======================#

    all_installed_sw = str(sp.check_output(['wmic', 'product', 'get', 'name']))

    try:
        total_dependencies = 0
        unmet_dependencies = []

        # TODO: Make this routine less shit
        with open('./dependencies.csv') as f:
            for i in range(len(all_installed_sw)):
                # Skip the csv header
                if i == 0:
                    continue

                total_dependencies += 1
                current_line = all_installed_sw.split("\\r\\r\n")[6:][i]

                dependency_met = check_dependency(f, current_line.strip())

                if dependency_met[0] is False:
                    unmet_dependencies.insert(dependency_met[1])

    except IndexError:
        if len(unmet_dependencies) > 0:
            print(f"Unmet dependencies found: {*unmet_dependencies,}")
            print("Please install these packages")
            exit(127)

        print("All dependencies are met")


def build_db_tables():
    # Installs dbml2sql every time. This would be better if this only ran when
    # dbml2sql does not already exist

    print("Installing dbml2sql")
    os.system('npm i -g @dbml/cli')
    print("Converting dbml to sql")
    os.system(f'dbml2sql {cwd}/aimless/db/db-schema.dbml')


build_db_tables()

# check_dependencies()
