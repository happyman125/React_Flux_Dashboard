# This script is run when the docker container starts
# It expects the environment variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY to be set
s3cmd sync /root/dashboard.cagedtornado.com/ s3://dashboard.cagedtornado.com --acl-public --no-mime-magic --guess-mime-type