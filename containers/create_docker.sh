# Build Docker container(s) for AIML.
set -e

# Ensure that we have correctly found the repo root:
cd ../../../
if [ "$(basename "$PWD")" != 'socioprophet' ]; then
    echo "*** Error: run from socioprophet/containers"
    exit 1
fi

cp "$SERVICE_DIR"/.dockerignore .
docker build . \
       --file "$SERVICE_DIR"/Dockerfile \
       --tag "$AIML_IMAGE_NAME" \
       --build-arg ARTIFACTORY_KEY="$ARTIFACTORY_KEY" \
       --build-arg PIP_INDEX_URL="$PIP_INDEX_URL" \
       $AIML_DOCKER_FLAGS
