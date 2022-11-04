const inquirer = require('inquirer');
const { Department, Role, Employee } = require('../../models');

const updatePrompt = async (bool) => {
    let str;
    let data;
    let arr;

    if(bool) {
        str = 'manager';

        data = await Employee.findAll({ 
            raw: true,
            where: {
                managerId: null,
            },
        });

        arr = data.map((manager) => {
            return {
                name: `${manager.firstName} ${manager.lastName}`,
                value: manager.id,
            }
        });
        
        arr.push({
            name: 'No manager',
            value: null,
        })
    } else {
        str = 'role';

        data = await Role.findAll({ raw: true });

        arr = data.map((role) => {
            return {
                name: role.title,
                value: role.id,
            }
        });
    }

    try {
        const empQ = inquirer.createPromptModule();

        const { updateId } = await empQ({
            type: 'list',
            name: 'updateId',
            message: `Which ${str} would you like to update the employee with?`,
            choices: arr,
            loop: true,
        })

        return updateId;
    } catch (err) {
        console.error(err);
    }

}

module.exports = updatePrompt;