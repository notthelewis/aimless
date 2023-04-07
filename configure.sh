#/bin/sh

# This shell script is written in good ol' Bourne shell syntax for compatability. It'll run in Bourne, Bourne again, Zsh,
# and Yash... and any other sh-compatible shell. Not sure about ksh, tcsh or whatever other weird shell someone is using.
# Regualar 'sh' is fairly ubiquitous. 
# Check this compatability table for more: https://tldp.org/LDP/Bash-Beginners-Guide/html/x7369.html
#
# I would _love_ to write this script in a better language (like Python or Typescript) in the future. For now, this 
# hacky script will have to do :)
#
# The script checks for dependencies on the system using the 'type' command.
# 	It then builds the containers using the Dockerfiles inside their directories.
# 		The script obtains both the dependencies & services to build from two sepearate .csv files.
#			./dependencies.csv
#			./service-names.csv
#		
#		For future additional services, add a folder with the title of the service name (RTMP for example) then put a 
#		Dockerfile in it. This script will then build it for you
#


# Check whether we can run a command on the host
command_exists() {
	type "$1" 1> /dev/null;
}

# Check command exists, exit script if it doesn't
check_command_print() {
	if command_exists $1; then
		echo "$1 exists"
	else
		echo "$1 dependency not met. Please install $1 and come back"
		exit
	fi
}

# Go through all of the dependencies.csv and run check_command_print()
check_all_dependencies() {
	while IFS=, read -r field; do
		if [ "$field" != "dependency_name" ];then # Skips the header
			check_command_print $field
		fi
	done < $1
}

# Builds a container from a Dockerfile
build_service() {
	echo "Building: $1"
	sh -c "cd $1; sudo docker build -t $1 ."
}

# Builds all services from the services.csv file
build_all_services() {
	while IFS=, read -r field; do
		if [ "$field" != "service_name" ]; then # Skips the header
			build_service $field
		fi
	done < $1
}

# Run docker-compose up -d on each service-name 
start_containers() {
	while IFS=, read -r field; do
		if [ "$field" != "service_name" ]; then # Skips the header
			sudo docker-compose up --build -d "$field"
		fi
	done < $1
}

# Get permission from user or die trying, soldier.
get_user_permission() {
	read -p "$1" yn
	case $yn in
		[Yy]* ) ;;
		[Nn]* ) exit;;
	esac
}

# Converts .dbml file to valid mysql instructions
convert_dbml_to_mysql() {
	if [ ! -f $1 ]; then
		echo "`pwd`/$1 not found."
		exit
	fi

	# Calculate input and output names
	inName=$1
	outName=`echo $1|sed 's/dbml/sql/'`

	# Convert input to MySQL syntax
	dbml2sql $1 --mysql -o $outName

	# Check whether the dbml-error.log file is empty
	if [ -s ./dbml-error.log ]; then
		echo "The syntax in $inName is wrong... Please see dbml-error.log"
		cat dbml-error.log
		exit
	else
		echo "The syntax appears correct. Written SQL to: $outName"
		rm dbml-error.log
	fi
}

# Mounts a docker container
mount_container() {
	sudo docker exec -it `docker ps | grep "$1" |awk '{print $1}'` sh
}

# Keep asking if containers need to be mounted until told no. This means that once everything is configured,
# containers can be mounted easily from this prompt.
check_container_mount() {
	get_user_permission "Do you wish to mount any containers? [y/n]: "

	echo "Please type the number that corresponds to the service you wish to mount: "
	echo "1) Database"
	echo "2) API"

	read -p "-> " service

	case $service in
		[1]* ) echo "Mounting Database"; mount_container "database";;
		[2]* ) echo "Mounting API"; mount_container "api";;
	esac

	check_container_mount
}


###############################################################################
# Start of main script.														  #
###############################################################################
echo "Checking dependencies..."
check_all_dependencies "./dependencies.csv"

# Install dbml2sql if it does not exist on the system
# The reason that we handle this differently to other dependencies is because it can be installed via NPM; thus installation is OS agnostic.
if ! command_exists "dbml2sql"; then
	echo "Dbml2sql does not exist on this machine.. "
	get_user_permission "Do you wish to install it? "
	npm install -g @dbml/cli
else
	echo "dbml2sql exists"
fi

get_user_permission "Compiling the .dbml source files to .sql file. Proceed?"

convert_dbml_to_mysql "aimlessdb/db-schema.dbml"

echo "All dependencies met. Next, we need to build the containers from the Dockerfiles."

get_user_permission "Do you wish to proceed with building them?"

build_all_services "./service-names.csv"

echo "All images have been built successfully. Starting services..."

# Start services
start_containers "./service-names.csv"

echo "Finished building tables.. Please see list of running services: "
sudo docker ps | grep "r2ds2"
