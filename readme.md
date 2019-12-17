# MyTutor-BackEnd

## Requirements
- Node.js (latest should be fine)
- MySQL Server

## Running MyTutor Backend

### Setting up Node.js dependencies
After you've imported the project you should run the command `npm install` in the project folder

### The .env file
To get started you should make a **.env** (dotenv) file, it should have the following format: 
```
DB_HOST=your_db_host_address
DB_PORT=your_db_port
DB_NAME=your_db_name
DB_USER=your_db_username
DB_PASSWORD=your_db_password
EXPRESS_PORT=your_express_port
```

### Starting the server
Simply run `npm start`

## Developing MyTutor Backend
We suggest you to use **VS Code**, in fact the repository contains the suggested style rules for the project.
In addition we suggest the following extensions for VS Code:
- **ESLint**, by Dirk Baeumer
- **Prettier - Code formatter**, by Esben Petersen

In fact, these extension will check and format automatically your code style. 