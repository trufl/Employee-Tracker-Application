const { Department, Role, Employee } = require('../../models');
const { viewPrompt, updatePrompt } = require('../questions');

const update = async(bool) => {
    const employeeId = await viewPrompt(3,bool);
    const id = await updatePrompt(bool);

    if(bool) {
        await Employee.update({ managerId: id }, { where: { id: employeeId } });
    } else {
        await Employee.update({ roleId: id }, { where: { id: employeeId } });
    }

    const employee = await Employee.findOne({ 
        raw: true,
        where: { id: employeeId },
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
    });

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
    
    console.log('=================================================');
    console.table(employee);
    console.log('=================================================');
}

module.exports = update;