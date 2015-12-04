FROM ubuntu:15.04

# Make sure node and npm are installed
RUN apt-get install -y curl
RUN curl --silent --location https://deb.nodesource.com/setup_0.12 | bash -
RUN apt-get install -y nodejs

# Copy the local package files to the container's workspace.
ADD . /root/dashboard

# Build the app inside the container.
# RUN npm install /root/dashboard