const { Department, Role, Employee } = require('../../models');
const { viewPrompt } = require('../questions/index');
const { Op } = require('sequelize')

const read = async(option) => {

    switch(option) {
        case 1:
            await depRead();
            break;
        case 2:
            await roleRead();
            break;
        case 3:
            await empRead();
            break;
        case 4: 
            const managerName = await viewPrompt(1);
            await empByManager(managerName);
            break;
        case 5:
            const depId = await viewPrompt(2);
            await empByDepartment(depId);
            break;
        case 6:
            const departmentId = await viewPrompt(2);
            await depBudget(departmentId);
            break;
        default:
            console.log('Something went wrong');
            break;
    }
}

const depRead = async () => {

    const departments = await Department.findAll({ raw: true });

    console.log('=================================================');
    console.table(departments);
    console.log('=================================================');
}

const roleRead = async () => {
    const roles = await Role.findAll({
        attributes: {
            exclude: ['department_id'],
        },
        raw: true,
        include: {
            model: Department,
            required: true,
        },
    })

    console.log('===================================================================================');
    console.table(roles);
    console.log('===================================================================================');
}

const empRead = async () => {
    const employees = await Employee.findAll({
        raw: true,
        required: true,
        include: [
            {
                model: Role,
                required: true,
                include: {
                    model: Department,
                    required: true,
                },
            },
            {
                model: Employee,
                as: 'Manager',
            },
        ]
    })


        employees.forEach((employee) => {
            delete employee.role_id;
            delete employee.manager_id;
            delete employee['role.id'];
            delete employee['role.department_id'];
            delete employee['role.department.id'];
            delete employee['Manager.id'];
            delete employee['Manager.roleId'];
            delete employee['Manager.managerId'];
            delete employee['Manager.role_id'];
            delete employee['Manager.manager_id'];
        });

    console.log('=================================================================================================================================================================');
    console.table(employees);
    console.log('=================================================================================================================================================================');
}

const empByManager = async (managerId) => {
    const employees = await Employee.findAll({ 
        raw: true,
        include: [
            {
                model: Role,
                required: true,
                include: {
                    model: Department,
                    required: true,
                },
            },
            {
                model: Employee,
                as: 'Manager',
            },
        ],
        where: {
            manager_id: managerId,
        },
    });

    employees.forEach((employee) => {
        delete employee.role_id;
        delete employee.manager_id;
        delete employee['role.id'];
        delete employee['role.department_id'];
        delete employee['role.department.id'];
        delete employee['Manager.id'];
        delete employee['Manager.roleId'];
        delete employee['Manager.managerId'];
        delete employee['Manager.role_id'];
        delete employee['Manager.manager_id'];
    });

    console.log('===========================================================================================================================================================');
    console.table(employees);
    console.log('===========================================================================================================================================================');
}

const empByDepartment = async (depId) => {
    const roles = await Role.findAll({
        raw: true,
        where: {
            department_id: depId,
        }
    });


    const roleIds = roles.map((role) => {
        return {
            roleId: role.id
        }
    });

    const employees = await Employee.findAll({ 
        raw: true,
        where: {
            [Op.or]: roleIds,
        }, 
        include: [
            {
                model: Role,
                required: true,
            },
            {
                model: Employee,
                as: 'Manager',
            },
        ]
    });

    employees.forEach((employee) => {
        delete employee.role_id;
        delete employee.manager_id;
        delete employee['role.id'];
        delete employee['role.department_id'];
        delete employee['role.department.id'];
        delete employee['Manager.id'];
        delete employee['Manager.roleId'];
        delete employee['Manager.managerId'];
        delete employee['Manager.role_id'];
        delete employee['Manager.manager_id'];
    });

    console.log('==============================================================================================================================================');
    console.table(employees);
    console.log('==============================================================================================================================================');
}

const depBudget = async (depId) => {
    const roleSalary = await Role.sum('salary', {
        where: {
            department_id: depId,
        }
    });

    const { name } = await Department.findOne({ 
        raw: true,
        where: { id: depId},
    });

    
    console.log('==============================================');
    console.log(`_______Total Salary For ${name}_______`);
    console.log("               $" + roleSalary);
    console.log('==============================================');
}

module.exports = read;
