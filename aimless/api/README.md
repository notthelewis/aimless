# Developing for the API

## Overview

If you want to run the flask app outside of the docker container, the API uses `pipenv` to manage dependencies. 
Install it with the following command: `pip install pipenv`.

Once you have pipenv installed, run: `pipenv shell`. This will install any dependencies required by the API.

Check https://realpython.com/pipenv-guide/ for more information on how to use pipenv.


You can use the docker instance in its current state, but it may be more cumbersome until I add an autoreload utility
