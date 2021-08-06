const readnote = () => {

    const fs = require('fs');

    const inputFileName = 'data.json'

    fs.readFile(inputFileName, 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading File:",  err);
        } try {
            const content = JSON.parse(data);
            Object.keys(content.notes).forEach( (key) => {
                console.log(`${key}: ${content.notes[key]}`);
            })
        } catch (err) {
            console.log("Error parsing JSON string: ", err);
        } 
    });
}

module.exports = readnote;