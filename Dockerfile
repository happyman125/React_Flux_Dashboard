FROM ubuntu:15.04

# Environment variables for credentials
ENV AWS_ACCESS_KEY_ID YOUR_ACCESS_KEY
ENV AWS_SECRET_ACCESS_KEY YOUR_SECRET_KEY

# Make sure node and npm are installed
RUN apt-get install -y curl
RUN curl --silent --location https://deb.nodesource.com/setup_0.12 | bash -
RUN apt-get install -y nodejs

# Install s3cmd
RUN apt-get install -y s3cmd

# Make sure the toolset is installed
RUN npm install -g browserify uglify-js

# Copy the local package files to the container's workspace.
ADD . /root/dashboard

WORKDIR /root/dashboard

# Build the app inside the container.
RUN npm install
RUN npm run build

# Run the deploy script by default when the container starts
CMD /root/dashboard/deployscript.sh
