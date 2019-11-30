## Socioprophet
This is the monorepo for the socioprophet platform. The codebase and repo is a work in progress.

## Scioprophet monorepo top-level directory layout

```bash
    .
    .gitignore                 	    #
    │── CONTRIBUTING.md             #
    ├── LICENSE.md                  #
    │── README.md                   #
    ├── bin                         # Compiled files (alternatively `dist`)
    ├── build                       # For deployment we assume that all the files (including the index page) required to run in `release` mode have been written to the `build` off the root (this directory).
    ├── cli                         # Directory containing prophet-cli code
    ├── clusters                    # Automated tests (alternatively `spec` or `tests`)
    ├── config                      # Configuration files and templates
    ├── containers                  # Containerization scripts for building from code
    │   ├── README.md               #
    │   ├── aiml                    #
    │   ├── create_docker.sh        #
    │   ├── data-io                 #
    │   ├── dev-user                #
    │   ├── knowledge-management    #
    │   │   └──**/**    
    │   ├──prophet-platform
    │   │   └──**/**
    │   ├── requirements.txt        #
    │   └── socioprophet-web        #
    │       └──**/**
    ├── data                        # Data is the essence of the prophet-platform
    ├── docs                        # Documentation files (alternatively `doc`)
    ├── logs                        #
    ├── packages                    # 
    ├── prophet-platform            # Prophet-platform code for sharing data, storage & compute
    │   └──**/**                               
    │── scripts                     # Scripts for automating tasks
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

## Folder Structure Conventions

SocioProphet's source code is nested beneath the `src` directories. For deployment, `yoke` assumes that all the files (including the index page) required to run in `release` mode have been written to a directory called either `dist` or `build` off the root. Grunt or Gulp both have good facilities for writing the outputs of a task to a different directory.

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
