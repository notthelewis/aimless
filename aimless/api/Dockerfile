FROM python:3.10.11-bullseye

# Required for installing the app dependencies
RUN pip3 install pipenv 

WORKDIR /aimless-api
# TODO: Only copy *relevant* files
COPY . /aimless-api/

RUN export FLASK_ENV=development

# Install dependencies
RUN pipenv install

# Start server
CMD ["pipenv", "run", "flask", "run", "--debug", "--host=0.0.0.0", "--port=42069"]
