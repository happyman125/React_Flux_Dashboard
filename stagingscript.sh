# Create the build.json
cat <<EOT > build.json
{
  "version" : "$CIRCLE_BUILD_NUM",
  "project" : "$CIRCLE_PROJECT_REPONAME"
}
EOT

# Make our js directory
mkdir $CIRCLE_ARTIFACTS/js/

# Copy selected files to staging area
cp -r css $CIRCLE_ARTIFACTS
cp -r font $CIRCLE_ARTIFACTS
cp -r fonts $CIRCLE_ARTIFACTS
cp js/bundle.js $CIRCLE_ARTIFACTS/js/
cp js/rainbowvis.js $CIRCLE_ARTIFACTS/js/
cp index.html $CIRCLE_ARTIFACTS
cp build.json $CIRCLE_ARTIFACTS
