## Build Setup

Some build setup documentation

## Building with the Makefile and Yarn

SocioProphet-Web can be built and run using the Makefile within the project root directory. The commands executed by the Makefile are the same commands one would use to build a project and run the webserver--these commands are documented here:

```bash
.PHONY: build_web run_server run_client

build_web:
	cd socioprophet-web/scripts/ && bash build_web.sh

run_server:
	cd socioprophet-web/scripts && bash start_mongod.sh && bash run_server.sh

run_client:
	cd socioprophet-web/scripts && bash run_client.sh
```

To build the socioprophet-web repository, run the following commands in the root directory:

```bash
# install website dependencies
make build_web

# to run the development web-server:
make run_server

# to run the webpack-dev-server for the client build:
make run_client
```

The 'make build_web' command documented above executes a shell script with the following:

```bash
#!/usr/bin/env bash

#build prophet-web
cd .. && yarn
cd client && yarn
```

The 'make run_server' command documented above executes a shell script with the following:

```bash
#!/usr/bin/env bash

#start-up socioprophet-web
cd .. && yarn run dev
```

The 'make run_client' command documented above executes a shell script with the following:

```bash
#!/usr/bin/env bash

#start-up socioprophet-web
cd .. && cd client && yarn run start
```
