const { Department, Role, Employee } = require('../../models');
const { newObjPrompt } = require('../questions/index');

const create = async(option) => {

    switch (option) {
        case 1:
            const depName = await newObjPrompt(option);
            await createNewDep(depName);
            break;
        case 2:
            const roleAns = await newObjPrompt(option);
            await createNewRole(roleAns);
            break;
        case 3:
            const empAns = await newObjPrompt(option);
            await createNewEmp(empAns);
            break;
        default:
            console.log('something went wrong');
            break;
    }

}

const createNewDep = async (depName) => {
    try {
        await Department.create({ name: depName });
        
        console.log("\nSuccessfully added new department!\n");
    } catch (err) {
        console.error(err);
    }
}

const createNewRole = async (roleAns) => {
    const { title, income, departmentId } = roleAns;

    const salary = parseInt(income);
    const department_id = parseInt(departmentId);

    try {
        await Role.create({
            title,
            salary,
            department_id
        });

        console.log("\nSuccessfully added new role!\n");
    } catch (err) {
        console.error(err);
    }
}

const createNewEmp = async (empAns) => {
    const { firstName, lastName, role, manager } = empAns;
    let managerId;

    const roleId = parseInt(role);
    if(manager!= null) {
        managerId = parseInt(manager);
    } else {
        managerId = null;
    }

    try {
        await Employee.create({
            firstName,
            lastName,
            roleId,
            managerId
        });

        console.log("\nSuccessfully added new employee!\n");
    } catch (err) {
        console.error(err);
    }
}

module.exports = create;