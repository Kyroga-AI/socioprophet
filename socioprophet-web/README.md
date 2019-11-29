## SocioProphet-Web

This folder contains the code for the socioprophet website. 

## SocioProphet-Web top-level directory layout

This is the directory of the monorepo for the website / user interfact of the prophet-platform. The codebase and repo are both a work in progress.


```bash
    .
    │── .gitignore                  #
    │── README.md                   #
    │── socioprophet-web            # Directory containing website platform code (back-end and front-end)
    │   ├── README.md               #
    │   ├── content                 #
    │   ├── public                  #
    │   ├── routes                  #
    │   ├── scripts                 #
    │   ├── server.js               #
    │   └── src                     #
    │        └──**/**               
    ├── webpack.config.js           #
    ├── partials/templatetest       # Automated tests (alternatively `spec` or `tests`)
    └── utils                       # Non-script utilities
```

## Build Setup 

Some build setup documentation

## Building with the Makefile vs. using Yarn

SocioProphet-Web can be built and run using the Makefile within the project root directory. The commands executed by the Makefile are the same commands one would use to build a project and run the webserver--these commands are documented here:

``` bash
.PHONY: build_web run_dev

build_web:
	cd socioprophet-web/scripts/ && bash build_web.sh

run_dev:
	cd socioprophet-web/scripts && bash start_mongod.sh && bash run_dev.sh
```

To build the socioprophet-web repository, run the following commands in the root directory:

``` bash
# install website dependencies
make build_web

# to run the development web-server:
make run_dev
```

The 'make build_web' command documented above executes a shell script with the following:

``` bash
#!/usr/bin/env bash

#build prophet-web
cd .. && yarn 
cd ../docs/ && yarn
```

The 'make run_dev' command documented above executes a shell script with the following:

``` bash
#!/usr/bin/env bash

#start-up socioprophet-web
cd .. && yarn run dev
```

As part of the process, the root Makefile calls 'start_mongod.sh'  which is a shell script with the following:

``` bash
#!/usr/bin/env bash

#start mongod and run in packground
mongod &
```
