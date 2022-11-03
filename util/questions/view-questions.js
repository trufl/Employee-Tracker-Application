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
        case 3:
            const employeeName = await employeePrompt();
            return employeeName;
        default:
            console.log('Something went wrong');
            break;
    }
}

const managerPrompt = async () => {
    const managersData = await Employee.findAll({
        raw: true,
        where: {
            managerId: null,
        },
    });

    const managerNames = managersData.map((manager) => {
        return {
            name: `${manager.firstName} ${manager.lastName}`,
            value: manager.id,
        }
    });

    try {
        const manangerQ = inquirer.createPromptModule();

        const { managerId } = await manangerQ({
            type: 'list',
            name: 'managerId',
            message: 'Which manager\'s employees would you like to view?',
            choices: managerNames,
            loop: true,
        })

        return managerId;
    } catch (err) {
        console.error(err);
    }
}

const departmentPrompt = async () => {
}

const employeePrompt = async () => {

}

module.exports = viewPrompt;