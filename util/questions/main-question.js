const inquirer = require('inquirer');
const choices = [
    "View all departments", "View all roles", "View all employees", new inquirer.Separator(), 
    "Add a department", "Add a role", "Add an employee", new inquirer.Separator(), 
    "Update employee role", "Update employee manager", new inquirer.Separator(), 
    "View employees by manager", "View employees by department", "View total budget by department", new inquirer.Separator(), 
    "Delete department", "Delete role", "Delete employee", new inquirer.Separator(), 
    "Exit",new inquirer.Separator(),
];

const mainPrompt = async () => {

    const answer = await inquirer.prompt({
        type: 'list',
        name: 'mainChoice',
        message: 'What would you like to do?',
        choices: choices,
        loop: true,
    })

    return answer.mainChoice;
}

module.exports = mainPrompt;