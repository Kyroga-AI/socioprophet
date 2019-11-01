
su postgres -c "PGDATA=/var/lib/pgsql/10/data /usr/pgsql-10/bin/pg_ctl -D /var/lib/pgsql/10/data start"
psql -U postgres -c 'CREATE USER root; ALTER USER root CREATEDB;'
cd models/AIML && timeout 1800 make postgres_init test
