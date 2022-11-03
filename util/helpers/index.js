const { Department, Role, Employee } = require('../../models');
const create = require('./create-helper');
const read = require('./read-helper');
const update = require('./update-helper');
const deleteHelp = require('./delete-helper');

const crud = async (choice) => {

  switch(choice) {
    case "View all departments":
      await read(1);
      break;
    case "View all roles":
      await read(2);
      break;
    case "View all employees":
      await read(3);
      break;
    case "Add a department":
      
      break;
    case "Add a role":
      
      break;
    case "Add an employee":
      
      break;
    case "Update employee role":
      
      break;
    case "Update employee manager":

      break;
    case "View employees by manager":
      await read(4);
      break;
    case "View employees by department":
      await read(5);
      break;
    case "View total budget by department":
      await read(6);
      break;
    case "Delete department":
      
      break;
    case "Delete role":
      
      break;
    case "Delete employee":
      
      break;
    case "Exit":
      console.log('\nGoodbye!')
      break;
    default:
      console.error("Something went wrong");
      break;
  }

}

module.exports = crud;