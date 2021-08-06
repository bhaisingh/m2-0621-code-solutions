
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
        if (process.argv.length === 5) {
            updateNote(process.argv[3], process.argv[4]);
        } else {
            console.log('Please provide one item # and updated string value');
        }
        break;
    case 'delete':
        if (process.argv.length === 4) {
            deleteNote(process.argv[3]);
        } else {
            console.log('Please provide the item # to be deleted');
        }
        break;
    case 'create':
        if ((process.argv.length === 4) && (process.argv[3].length > 0)) {
            createNote(process.argv[3]);
        } else {
            console.log('Please provide string value to be added');
        }
        break;
    default:
        console.log('Please enter a valid function');
        break;
}