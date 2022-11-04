# Employee Tracker

## Description

The Employee Tracker CLI application is designed to keep track of a company's departments, roles, managers, and employees. With this app you will be able
to view, update, and delete company departments, roles, managers, and employees. It uses sequelize and mysql to query to your database behind the scenes
to help you keep track of and store your valuable information.

## Table of Contents 

- [Installation](#Installation)
- [Usage](#Usage)
- [Credits](#Credits)
- [License](#License)

## Installation

Installation instructions: `npm i`   
Log in to MySQL and in MySQL CLI: run `SOURCE db/schema.sql`  
If you want the starter data, log out of MySQL and in the CLI: run `npm run seed`  
Convert the .env.EXAMPLE to a regular .env file in the root directory with 
three variables with your respective credentials:
(DB_NAME is already defined for you for in the example file)
`DB_NAME='database name'` `DB_USER='user name'` `DB_PASSWORD='SQL password'`  

## Usage
After the installation instructions have been completed you can start the application by running `npm start`. If you seeded the database you can start viewing 
departments, roles, and employees. Otherwise, you can start adding all the info you want and update/delete data as needed.

What the application should look like when started:

![screenshot](assets/images/screenshot.png)


## Credits

N/A 


## License

N/A
