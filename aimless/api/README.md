# Developing for the API

## Overview
This API runs inside a docker container "aimless_aimlessapi_1". Run the configure script in the root of the repo to 
scafold the appliation and get everything running. 

When running, the API can be found on port: 69420 on the localhost. 
If you want to view the application logs as it's running, run this command in the terminal:
`docker logs -f aimless_aimlessapi_1`

Hit ctrl+c to escape that window when finished

### Running OUTSIDE the container
If you _really_ want to run the flask app outside of the docker container, the API uses `pipenv` to manage dependencies. 
Install it with the following command: `pip install pipenv`.

Once you have pipenv installed, run: `pipenv shell`. This will install any dependencies required by the API.
Check https://realpython.com/pipenv-guide/ for more information on how to use pipenv.

Then run it with: `pipenv run flask run --debug --host="0.0.0.0" --port="69420"`

This will give you the same results, but it's not 100% guaranteed to be the same as what's on the docker container. This
is because the docker container uses the exact same OS (debian buster) to execute Python code on the exact same version
(3.10.11). So if you're working on Windows and someone else is working on Linux, the result will ALWAYS be consistent
because Docker runs Debian inside your host OS.

TLDR;
Use the docker container
