# Copy selected files to staging area
cp -r css $CIRCLE_ARTIFACTS
cp -r font $CIRCLE_ARTIFACTS
cp -r fonts $CIRCLE_ARTIFACTS
cp js/*.js $CIRCLE_ARTIFACTS/js/
cp index.html $CIRCLE_ARTIFACTS
cp build.json $CIRCLE_ARTIFACTS
