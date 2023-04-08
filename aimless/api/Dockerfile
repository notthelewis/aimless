FROM python:3.10.11-bullseye

# Required for installing the app dependencies
RUN pip3 install pipenv 

WORKDIR /aimless-api

COPY . /aimless-api/
# Copy the app 
# COPY ./*.py /aimless-api/
# COPY ./**/*.py /aimless-api/
# COPY ./templates /aimless-api/

# Copy pipfile dependencies
# COPY ./Pipfile /aimless-api/
# COPY ./Pipfile.lock /aimless-api/

# Install dependencies
RUN pipenv install

# Start server
CMD ["pipenv", "run", "flask", "run", "--host=0.0.0.0", "--port=42069"]
