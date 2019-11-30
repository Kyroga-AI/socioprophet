## Socioprophet-web/src directory top-level directory layout

```bash
    .
    ├──.gitignore                 	    #
    ├── App.js                	        #
    ├── App.scss              	        #
    ├── index.js                	    #
    ├── polyfill.js                	    #
    ├── store.js                 	    #
    ├── actions                         # 
    │   ├── authActions.js              #
    │   ├── types.js                    #               
    ├── images                          # 
    │   └──**/**                        #
    ├── utils                           #                   
    ├── components                      # 
    │   ├── SearchBar                   #
    │   ├── auth                        #
    │   ├── dashboard                   #
    │   ├── layout                      #
    │   ├── pages                       #
    │   ├── privateproute               #  
    │   ├──README.md                    #
    ├── models                          # 
    |    └── Users.js                   #
    ├── validation                      # 
    │   ├── login.js                    #
    │   ├── register.js                 #
    │   ├── config                      #
    │   │   └──keys.js                  #
    |   |   └──passport.js              #
    ├── utils                           #    
    │   └──setAuthToken.js              #
    │── reducers                        # 
        ├──authReducer.js               #
        ├──errorReducer.js              #
        └──index.js                     #
    
```

## Folder Structure Conventions

SocioProphet's source code is nested beneath the `src` directories. For deployment, `yoke` assumes that all the files (including the index page) required to run in `release` mode have been written to a directory called either `dist` or `build` off the root. 
