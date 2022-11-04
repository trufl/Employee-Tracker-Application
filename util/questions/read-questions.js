const inquirer = require('inquirer');
const { Department, Employee } = require('../../models');
const { Op } = require('sequelize');

const viewPrompt = async (choice, bool) => {

    switch(choice) {
        case 1:
            const managerId = await managerPrompt();
            return managerId;
        case 2:
            const depId = await departmentPrompt(bool);
            return depId;
        case 3:
            const employeeId = await employeePrompt(bool);
            return employeeId;
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

const departmentPrompt = async (bool) => {
    let str;

    if(bool) {
        str = 'employees'
    } else {
        str = 'budget'
    }

    const departmentsData = await Department.findAll({
        raw: true,
    });

    const departmentNames = departmentsData.map((department) => {
        return {
            name: department.name,
            value: department.id,
        }
    });

    try {
        const depQ = inquirer.createPromptModule();

        const { departmentId } = await depQ({
            type: 'list',
            name: 'departmentId',
            message: `Which department\'s ${str} would you like to view?`,
            choices: departmentNames,
            loop: true,
        })

        return departmentId;
    } catch (err) {
        console.error(err);
    }
}

const employeePrompt = async (manUpdate) => {
    const employeesData = await Employee.findAll({
        raw: true,
    });

    const employeeNames = employeesData.map((employee) => {
        return {
            name: `${employee.firstName} ${employee.lastName}`,
            value: employee.id,
        }
    });

    try {
        const empQ = inquirer.createPromptModule();

        const { employeeId } = await empQ({
            type: 'list',
            name: 'employeeId',
            message: 'Which employee would you like to update?',
            choices: employeeNames,
            loop: true,
        })

        return employeeId;
    } catch (err) {
        console.error(err);
    }
}

module.exports = viewPrompt;