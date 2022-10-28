const { Department, Role, Employee } = require('../../models');

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
            const depName = await viewPrompt(2);
            await empByDepartment(depName);
            break;
        case 6:
            const departmentName = await viewPrompt(2);
            await depBudget(departmentName);
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

const empByManager = async (managerName) => {
    const { id: manId } = await Employee.findOne({
        raw: true,
        where: {
            firstName: managerName,
        }
    });

    const employees = await Employee.findAll({ 
        raw: true,
        where: {
            manager_id: manId,
        }, 
        include : {
            model: Employee,
            as: 'Manager',
        },
    });

    console.table(employees);
}

const empByDepartment = async (depName) => {
    const { id: depId } = await Department.findOne({
        raw: true,
        where: {
            name: depName,
        }
    });

    const employees = await Employee.findAll({ 
        raw: true,
        where: {
            department_id: depId,
        }, 
        include : {
            model: Employee,
            as: 'Manager',
        },
    });

    console.table(employees);
}

const depBudget = async (depName) => {
    const { id: depId } = await Department.findOne({
        raw: true,
        where: {
            name: depName,
        }
    });

    const employees = await Employee.findAll({ 
        raw: true,
        where: {
            department_id: depId,
        }, 
        include : {
            model: Employee,
            as: 'Manager',
        },
    });

    console.table(employees);
}

module.exports = read;
