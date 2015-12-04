FROM ubuntu:15.04

# Make sure node and npm are installed
RUN apt-get install -y curl
RUN curl --silent --location https://deb.nodesource.com/setup_0.12 | bash -
RUN apt-get install -y nodejs

# Make sure the toolset is installed
npm install -g browserify uglify-js

# Copy the local package files to the container's workspace.
ADD . /root/dashboard

WORKDIR /root/dashboard

# Build the app inside the container.
RUN npm install
RUN npm run build