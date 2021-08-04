
const readNote = require('./readnote.js');
const updateNote = require('./updatenote.js');
const deleteNote = require('./deletenote.js');
const createNote = require('./createnote.js');

const functionToPerform = process.argv[2];

switch(functionToPerform) {
    case 'read':
        readNote();
        break;
    case 'update':
        updateNote(process.argv[3], process.argv[4]);
        break;
    case 'delete':
        deleteNote(process.argv[3]);
        break;
    case 'create':
        createNote(process.argv[3]);
        break;
}