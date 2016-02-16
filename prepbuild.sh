# This file is meant to be run as part of the build process
# before the docker image is built.  The files it references
# are included as part of the docker image

# Create the build.json
cat <<EOT > build.json
{
  "version" : "$CIRCLE_BUILD_NUM",
  "project" : "$CIRCLE_PROJECT_REPONAME"
}
EOT

# Set our other scripts to execute:
chmod 755 stagingscript.sh
chmod 755 deployscript.sh
