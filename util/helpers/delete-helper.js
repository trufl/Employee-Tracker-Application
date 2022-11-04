const { Department, Role, Employee } = require("../../models");
const { deleteObj } = require("../questions");

const deleteHelp = async(option) => {

    switch(option) {
        case 1:
            const depId = await deleteObj(option);
            await deleteDepartment(depId)
            break;
        case 2:
            const roleId = await deleteObj(option);
            await deleteRole(roleId);
            break;
        case 3:
            const empId = await deleteObj(option);
            await deleteEmployee(empId);
            break;
        default:
            console.log('something went wrong');
            break;
    }
}

const deleteDepartment = async (id) => {

    try {
        await Department.destroy({ where: { id: id } });

        console.log("\nSuccessfully deleted department!\n");
    } catch (err) {
        console.error(err);
    }
}

const deleteRole = async (id) => {
    try {
        await Role.destroy({ where: { id: id } });

        console.log("\nSuccessfully deleted role!\n");
    } catch (err) {
        console.error(err);
    }
}

const deleteEmployee = async (id) => {
    try {
        await Employee.destroy({ where: { id: id } });

        console.log("\nSuccessfully deleted employee!\n");
    } catch (err) {
        console.error(err);
    }
}

module.exports = deleteHelp;