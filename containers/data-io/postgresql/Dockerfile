
# Creates a Docker container for continuous integration.
FROM registry.access.redhat.com/ubi8/ubi-minimal
WORKDIR /workspace

RUN microdnf install -y bzip2 gzip tar curl python36-devel gcc-c++ && microdnf clean all
#needs artifactory key stuff here
COPY ./socioprophet/containers/requirements.txt /workspace
ENV PIP_DISABLE_PIP_VERSION_CHECK=1
ARG PIP_INDEX_URL
ENV PIP_EXTRA_INDEX_URL="https://pypi.org/simple"
RUN PIP_INDEX_URL=$PIP_INDEX_URL python3 -m pip install --no-cache-dir -r /workspace/requirements.txt

# requirements for continuous integration:
RUN microdnf install make && microdnf clean all
COPY ./socioprophet/containers/requirements.txt /workspace
RUN python3 -m pip install --no-cache-dir -r /workspace/requirements.txt

# satisfy postgres requirement inside this container:
RUN curl -O https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm
RUN rpm -ivh pgdg-redhat-repo-latest.noarch.rpm
RUN microdnf install postgresql10-server.x86_64 && microdnf clean all \
        && cp /usr/pgsql-10/share/pg_hba.conf.sample /usr/pgsql-10/share/pg_hba.conf \
        && sed -i 's/@authmethodhost@/trust/g' /usr/pgsql-10/share/pg_hba.conf \
        && sed -i 's/@authmethodlocal@/trust/g' /usr/pgsql-10/share/pg_hba.conf \
        && sed -i 's/@authcomment@//g' /usr/pgsql-10/share/pg_hba.conf \
        && sed -i 's/@remove-line-for-nolocal@//g' /usr/pgsql-10/share/pg_hba.conf \
        && su postgres -c "PGDATA=/var/lib/pgsql/10/data /usr/pgsql-10/bin/initdb"
RUN ln -s /usr/bin/python3 /usr/bin/python

RUN microdnf remove -y gcc-c++ gcc && microdnf clean all

COPY . /workspace/

CMD "./socioprophet/containers/continuous_integration/start.sh"
