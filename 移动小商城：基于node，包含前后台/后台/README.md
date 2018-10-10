##	m-mall-admin

##	Overview

This is a boilerplate application for building REST APIs in Node.js using ES6 and Express with Code Coverage and JWT Authentication.

backend technology **Node.js** 、 **MongoDB** 、 **Redis** 、 **Express** 、 **ES6**

frontend technology **Angular.js** 、 **Ionic** 、 **ES6** 、 **Webpack**

##	Directory

*	[Demo](#Demo)
*	[Features](#Features)
*	[Getting Started](#Getting Started)
*	[Contributing](#Contributing)
*	[License](#License)

##	Demo
[Demonstration component](http://skyvow.github.io/m-mall-admin/)

##	Features

| Feature                                | Summary                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ES6 via Babel                  	 	 | ES6 support using [Babel](https://babeljs.io/).  |
| Authentication via JsonWebToken                  	 	 | Supports authentication using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).  |

##	Getting Started

Clone the repo:
```sh
git clone git@github.com:skyvow/m-mall-admin.git
cd m-mall-admin
```

Install dependencies of backend:
```sh
npm install
```

Start server of backend:
```sh
# set DEBUG env variable to get debug logs
npm start
```

Install dependencies of frontend:
```sh
cd public
npm install
```

Start server of frontend:
```sh
# monitor file changes and automatically compile
npm run watch
```

Other commands:
```sh
# packaged and compressed files in a development environment
npm run test
# packaged and compressed files in a production environment
npm run build
```

Create API document:
```sh
# apiDoc creates a documentation from API annotations in your source code
npm run apidoc
```

Execute tests:
```sh
# compile with babel and run tests
npm test
```

##	Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions submit a pull request with unit test.

##	License

MIT