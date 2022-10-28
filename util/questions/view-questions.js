const inquirer = require('inquirer');
const { Department, Employee } = require('../../models');

const viewPrompt = async (choice) => {

    switch(choice) {
        case 1:
            const managerName = await managerPrompt();
            return managerName;
        case 2:
            const depName = await departmentPrompt();
            return depName;
        default:
            console.log('Something went wrong');
            break;
    }
}

const managerPrompt = async () => {
}

const departmentPrompt = async () => {
}

module.exports = viewPrompt;