# Stage 1: Build environment
FROM python:3.11.0-slim AS build

# Install Git, Node.js, and other necessary system dependencies
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git && \
    apt-get clean

ENV NODE_VERSION=18.12.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

# Set the working directory in the build environment
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

RUN pip install virtualenv

RUN virtualenv env

# install yarn
RUN npm install --global yarn

# Install Node.js dependencies
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 80

CMD ["/bin/bash", "-c", ". env/bin/activate && pip install -r requirements.txt && gingerjs build && gunicorn --workers 1 --bind 0.0.0.0:80 main:app"]