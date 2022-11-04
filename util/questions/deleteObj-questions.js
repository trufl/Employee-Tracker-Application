const { Department, Role, Employee } = require('../../models');
const inquirer = require("inquirer");

const deleteObj = async (option) => {

    switch(option) {
        case 1:
            const depId = await deleteDep();
            return depId;
        case 2:
            const roleId = await deleteRole();
            return roleId;
        case 3:
            const empId = await deleteEmp();
            return empId;
        default:
            console.log('something went wrong');
            break;
    }
}

const deleteDep = async () => {
    const departmentsData = await Department.findAll({ raw: true });

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
            message: `Which department would you like to delete?`,
            choices: departmentNames,
            loop: true,
        })

        return departmentId;
    } catch (err) {
        console.error(err);
    }
}

const deleteRole = async () => {
    const rolesData = await Role.findAll({ raw: true });

    const roleNames = rolesData.map((role) => {
        return {
            name: role.title,
            value: role.id,
        }
    });

    try {
        const roleQ = inquirer.createPromptModule();

        const { roleId } = await roleQ({
            type: 'list',
            name: 'roleId',
            message: `Which role would you like to delete?`,
            choices: roleNames,
            loop: true,
        })

        return roleId;
    } catch (err) {
        console.error(err);
    }
}

const deleteEmp = async () => {
    const employeesData = await Employee.findAll({ raw: true });

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
            message: 'Which employee would you like to delete?',
            choices: employeeNames,
            loop: true,
        })

        return employeeId;
    } catch (err) {
        console.error(err);
    }
}

module.exports = deleteObj;