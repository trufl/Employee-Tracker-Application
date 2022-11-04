const mainPrompt = require('./main-question');
const viewPrompt = require('./read-questions')
const updatePrompt = require('./update-question')
const newObjPrompt = require('./createNew-questions');
const deleteObj = require('./deleteObj-questions');

module.exports = {
    mainPrompt,
    viewPrompt,
    updatePrompt,
    newObjPrompt,
    deleteObj,
}