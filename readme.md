# MyTutor-BackEnd

[![Build Status](https://travis-ci.com/fabiolademarco/MyTutorBack-End.svg?branch=master)](https://travis-ci.com/fabiolademarco/MyTutorBack-End)

## Requirements
- Node.js, complete installation (latest should be fine)
- MySQL Server

## Running MyTutor Backend

### Creating and populating the DB
First of all, you have to create an populate the database. Scripts are located into `db_scripts` folder.
Run `MyTutorDB.sql` and then `MyTutorDBPopulator.sql`. In the db creation script is
also created a user that you can use to log in into the db (**This should not be used in production**).

### Setting up Node.js dependencies
After you've imported the project you should run the command `npm install` in the project folder

### The .env file
To get started you should make a **.env** (dotenv) file, it should have the following format: 
```
EXPRESS_PORT=your_express_port
PRIVATE_KEY=your_private_key
DATABASE_URI=mysql://mt_admin:mt_password@localhost/mytutor
```

### Starting the server
Simply run `npm start`

## Developing MyTutor Backend
We suggest you to use **VS Code**, in fact the repository contains the suggested style rules for the project.
In addition we suggest the following extensions for VS Code:
- **ESLint**, by Dirk Baeumer
- **Prettier - Code formatter**, by Esben Petersen

In fact, these extension will check and format automatically your code style. 
