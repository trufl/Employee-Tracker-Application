const inquirer = require("inquirer");
const { Department, Role, Employee } = require('../../models');
const { Op } = require('sequelize');


const newObjPrompt = async (option) => {

    switch(option) {
        case 1:
            const depName = await depPrompt();
            return depName;
        case 2:
            const roleAns = await rolePrompt();
            return roleAns;
        case 3:
            const employeeAns = await employeePrompt();
            return employeeAns;
        default:
            console.log('something went wrong');
            break;
    }

}

const depPrompt = async () => {
    const newDepPrompt = inquirer.createPromptModule();

    const { name } = await newDepPrompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?'
    });

    return name;
}

const rolePrompt = async () => {
    const departmentsData = await Department.findAll({
        raw: true,
    });

    const departmentNames = departmentsData.map((department) => {
        return {
            name: department.name,
            value: department.id,
        }
    });

    const questions = [
        {
        type: 'input',
        name: 'title',
        message: 'What is the name of the role?'
        },
        {
        type: 'input',
        name: 'income',
        message: 'What is the salary of the role?'
        },
        {
        type: 'list',
        name: 'departmentId',
        message: 'What department does the role belong to?',
        loop: true,
        choices: departmentNames,
        },
    ]

    const newRolePrompt = inquirer.createPromptModule();

    const newRoleAns = await newRolePrompt(questions);

    return newRoleAns;
}

const employeePrompt = async () => {
    const roleIds = [];
    let depId;


    const roleData = await Role.findAll({ 
        raw: true,
    });

    const roles = roleData.map((role) => {
        return {
            name: role.title,
            value: role.id,
        }
    });

    const questions  = [
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s role?',
            loop: true,
            choices: roles,
        },
        {
            type: 'confirm',
            name: 'isManager',
            message: 'Is this employee a manager?'
        }
    ]

    const newEmpPrompt = inquirer.createPromptModule();

    const ans = await newEmpPrompt(questions);

    if(!ans.isManager) {
        roleData.forEach((role) => {
            if(parseInt(role.id) === parseInt(ans.roleId)) {
                depId = role.department_id;
            }
        });

        roleData.forEach((role) => {
            if(parseInt(role.department_id) === parseInt(depId)) {
                roleIds.push(parseInt(role.id));
            }
        });

        if(roleIds.length > 0) {
            const managerData = await Employee.findAll({
                raw: true,
                where: {
                    [Op.and]: [{ managerId: null }, { roleId: { [Op.or]: roleIds } }],
                },
            });

            delete ans.isManager;

            const newEmpAns = {
                ...ans,
                manager: managerData[0].id,
            }

            return newEmpAns;
        }

        delete ans.isManager;
        return { ...ans, manager: null,};
    }

    delete ans.isManager;

    return { ...ans, manager: null,}
}

module.exports = newObjPrompt;


