## SocioProphet-Web

This folder contains the code for the socioprophet website. 

## SocioProphet-Web top-level directory layout

```bash
    .
    │── .gitignore                   #
    │── .babelrc                     #
    ├── README.md                    #
    │── server.js                    #
    ├── webpack.config.js            # Compiled files (alternatively `dist`)
    ├── content                      # For deployment we assume that all the files (including the index page) required to run in `release` mode have been written to the `build` off the root (this directory).
    ├── web-docs                     # Directory containing prophet-cli code
    ├── routes/api                   # Automated tests (alternatively `spec` or `tests`)
    ├── scripts                      # Configuration files and templates
    └── src                          #
       └──**/**
```


