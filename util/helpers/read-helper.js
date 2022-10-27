const { Department, Role, Employee } = require('../../models');

const read = async(model, option) => {

    switch(option) {
        case 1:
            await depRead(model);
            break;
        case 2:
            await roleRead(model);
            break;
        case 3:
            await empRead(model);
            break;
        default:
            console.log('Something went wrong');
            break;
    }
}

const depRead = async (model) => {

    const departments = await model.findAll({ raw: true});

    console.log('=================================================');
    console.table(departments);
    console.log('=================================================');
}

const roleRead = async (model) => {
    const roles = await model.findAll({
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

const empRead = async (model) => {
    const employees = await model.findAll({
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

module.exports = read;