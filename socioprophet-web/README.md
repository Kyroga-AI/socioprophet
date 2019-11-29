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

# Building with the Makefile vs. using Yarn

SocioProphet-Web can be built and run using the Makefile within the project root directory. The commands executed by the Makefile are the same commands one would use to build a project and run the webserver.

To build the socioprophet-web repository, run the following commands in the root directory:

``` bash
# install website dependencies
make build_web

# to run the development web-server:
make run_dev
```

