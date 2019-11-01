
# Creates a Docker container.
FROM registry.access.redhat.com/ubi8/ubi-minimal
WORKDIR /workspace

# NOTE: always microdnf clean all: https://github.com/cekit/cekit/issues/485
RUN microdnf install -y bzip2 gzip tar curl python36-devel gcc-c++ && microdnf clean all
ARG ARTIFACTORY_KEY
RUN curl -Ou relayinfohere:$ARTIFACTORY_KEY " " \
        && python3 -m pip install --no-cache-dir pip-19.1.1-py2.py3-none-any.whl \
        && rm pip-19.1.1-py2.py3-none-any.whl

COPY ./socioprophet/containers/requirements.txt /workspace
ENV PIP_DISABLE_PIP_VERSION_CHECK=1
ARG PIP_INDEX_URL
ENV PIP_EXTRA_INDEX_URL="https://pypi.org/simple"
RUN PIP_INDEX_URL=$PIP_INDEX_URL python3 -m pip install --no-cache-dir -r /workspace/requirements.txt

