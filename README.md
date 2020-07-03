## Socioprophet
This is the monorepo for the socioprophet platform. The codebase and repo is a work in progress.

## Socioprophet monorepo top-level directory layout

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

## Build Targets

| Target              | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `all`               | Build all resources locally.                              |
| `images`            | Build all of the docker images.                           |
| `push`              | Push the previously built docker images.                  |
| `charts`            | Build all of the helm charts                              |
| `clean`             | Clean up any previously built artifacts.                  |
| `deploy`            | Deploy the helm charts.                                   |
| `update`            | Re-deploy the previously built chart with updated values. |
| `deploy-monitoring` | Deploy monitoring components.                             |
| `deploy-all`        | Deploy and the monitoring components.             |

## Build Variables

All of the variables that control the build are in `Makefile.inc` in the root of this repository.  Full descriptions of each variable can be found there.  Below are some common variables that you may need to use.

| Name                        | Description                                          | Default   |
| --------------------------- | ---------------------------------------------------- | --------- |
| `DOCKER_REGISTRY`           | Docker registry for built images                     |           |
| `DOCKER_REGISTRY_NAMESPACE` | Namespace within the docker registry to place images |           |
| `DOCKER_REPOSITORY`         | Docker repository to use for the built images        | `default`  |
| `TAG`                       | Build number to tag all artifacts with               | `latest`  |
| `NAMESPACE`                 | Kubernetes namespace to deploy into                  | `default` |

## Build Configuration

The `local.make` file in the root of this repository is meant to contain development environment specific settings that should not generally be checked into the repository.  When you need to configure the build for your environment this file should be changed.  If you find yourself in a situation where you have to change files that are generally checked in for your local environment then that is an indication that either the build needs to additional options or there is something wrong with your environment.


## Developer's Guide

### System Requirements

The following hardware is required for running the system locally under Minikube.  If running the system on a hosted Kubernetes platform then these system requirements do not apply.

* 4 Cores
* 20G of storage
* 8G of memory

### Development Tools

* GNU Make
* [IBM Cloud CLI 0.9.0+](https://www.ibm.com/cloud/cli)
* [Minikube v0.28.2+](https://kubernetes.io/docs/tasks/tools/install-minikube/) and appropriate VM driver for local development
* Kubernetes v1.10.0+
* [Docker 18.06+](https://www.docker.com/)
* [google cloud sdk cli] (https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-299.0.0-darwin-x86_64.tar.gz)

### Setup
1. Setup Git and download this repository
	1. Install the Git CLI tools (or Github Desktop)
	2. set-up git  and download the repository.
	3. Replace step 4 git clone command with 
	```bash
	git clone git@github.ibm.com:cognitive-data-platform/datahub.git
	```

1. Install hyperkit, a mini virtual machine environment.
	```bash
	curl -LO https://storage.googleapis.com/minikube/releases/latest/docker-machine-driver-hyperkit
	chmod a+x docker-machine-driver-hyperkit
	chown root:wheel docker-machine-driver-hyperkit
	sudo mv docker-machine-driver-hyperkit /usr/local/bin/
	```

2. Download and install Docker Community Edition.
	1. Follow the instructions [here](https://store.docker.com/search?offering=community&type=edition) to download Docker.
	2. Login to Artifactory [here](enter site address url here) and copy your API key. The API key can be obtained by clicking your username (at the top right by the logout link), which redirects to the Settings page.
	3. Input your password to unlock the below Authentication Settings. 
	4. Press the Copy icon to copy your artifactory key 
	5. Inside of a terminal run the following command 
	```bash 
	docker login <socioprophet artifactory address> -u <intranet email address> -p <Artifactory API key>
	```

1. Download and install the IBM Cloud CLI.

    If the ```ibmcloud``` command does not work during the installation verification step,
download the IBM Cloud CLI standalone [executable](https://console.bluemix.net/docs/cli/reference/ibmcloud/download_cli.html#install_use).


3. Build using `make all`

#### Minikube Setup

1. Download and install Minikube and an associated VM driver.  See the documentation for Minikube on how to set this up.
2. Configure Minikube so that it will always start kubernetes environments with the appropriate specifications.

	```bash
	minikube config set memory 8192
	minikube config set cpus 4
	minikube config set disk-size 20G
	minikube config set vm-driver your-vm-driver
	```

3. Start a minikube environment

	```bash
	minikube start
	```

4. Export the docker environment for minikube to your host.  This will ensure that any docker images built will be available within the Kubernetes environment.

	```bash
	eval $(minikube docker-env)
	```

4. Wait for the environment to come up.  When it's up you can run `minikube dashboard` to get to the Kubernetes dashboard.

	```bash
	minikube dashboard
	```

#### Development

After your environment is up and running you can build and deploy the system by following the set-up description below


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
