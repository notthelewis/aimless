## DEPRECATED

This project has unfortunately been abandoned. I have made it public to showcase to any potential employers that I have 
skills in Docker. To any prospective employers, there are some branches which contain more insight into the work itself.
This project does not work in its current state but it just used to demonstrate that I have in-fact worked with Docker,
NGINX, NodeJS, React, Express & Python. 

# aimless

A stream platform.


# Running

Aimless stream uses Docker.

In order to run this locally:
 - If not on a Unix-Like OS, unfortunately you'll have to either do this manually or use WSL2
 - Install Docker
 - Install NodeJS (for the dmbl2sql script)
 - run `./configure.sh`

This script checks for dependencies, sets up some basic things (like converting dbml to sql for example) then creates 
docker containers for each of the services in question.

Once it's ran successfully, it will prompt you asking whether you want to mount any containers. You can safely Ctrl+C 
out of this, it is only really useful for debugging.

# Services

The services inside aimless are as follows: 
     - aimlessdb
     - aimlessapi
     - aimlessrtmp
     - aimlessgui

TODO: Flesh out documentation
