## Description
This project is the backend to the [ijtemaApp](https://github.com/shaan1337/ijtemaApp) ionic mobile app  
This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.2.2.

## Features
- API for programme, competition registration, leaderboard & news
- API to download registrations for competition organizers: `/api/registrations/[sports|literary]`  
- Push news notifications
- Update leaderboard
- User signup/login

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MariaDB or MySQL](https://mariadb.org)

### Developing

1. Setup your SQL database as follows:  
- Use an empty `root` password
- Create an empty database named `ijtema`

2. Clone the repository and change directory
```bash
$ git clone https://github.com/shaan1337/ijtemaApp-backend.git
$ cd ijtemaApp-backend
```

3. Run `npm install` to install server dependencies.

4. Copy `./server/firebase/config.js.example` to `./server/firebase/config.js` and edit the file with your Firebase configuration (for push notifications)

5. Run `gulp serve` to start the development server. 
This should automatically create tables in the database and open your browser when ready.

### Production Build
```bash
$ gulp build
$ export NODE_ENV=production
$ export PORT=9000
$ node ./dist/server/app.js
```

See also [ijtemaApp-awsdeploy](https://github.com/shaan1337/ijtemaApp-awsdeploy) for automatic deployment.

## All ijtemaApp projects
[ijtemaApp](https://github.com/shaan1337/ijtemaApp) - ionic mobile app  
[ijtemaApp-backend](https://github.com/shaan1337/ijtemaApp-backend) - backend to ijtemaApp  
[ijtemaApp-awsdeploy](https://github.com/shaan1337/ijtemaApp-awsdeploy) - deployment script to deploy ijtemaApp-backend AWS  