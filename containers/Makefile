#-------------------------------------------------------------------------------
# Recipes around building docker images.
#-------------------------------------------------------------------------------

.PHONY: prophet_platform
prophet_platform:
	AIML_DOCKER_TYPE=prophet_platform sh create_docker.sh
	rm -rf prophet_platform/proto

.PHONY: data-io
#need to add all data-io containers here
standalone:
	AIML_DOCKER_TYPE=standalone sh create_docker.sh

