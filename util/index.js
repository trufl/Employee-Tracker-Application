const { mainPrompt } = require('./questions');
const crud = require('./helpers');

const init = async () => {
    let choice = "";

    while (choice !== 'Exit') {       
        
        choice = await mainPrompt();

        await crud(choice);
    }

    console.log("finished");
}

module.exports = init;