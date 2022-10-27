const { Department, Role, Employee } = require('../../models');
const create = require('./create-helper');
const read = require('./read-helper');
const update = require('./update-helper');
const deleteHelp = require('./delete-helper');

const crud = async (choice) => {

  switch(choice) {
    case "View all departments":
      await read(Department,1);
      break;
    case "View all roles":
      await read(Role,2);
      break;
    case "View all employees":
      await read(Employee,3);
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
      
      break;
    case "View employees by department":
      
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