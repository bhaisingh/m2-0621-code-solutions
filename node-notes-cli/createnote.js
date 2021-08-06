const createnote = (inputString) => {

    const fs = require('fs');

    const FileName = 'data.json'

    fs.readFile(FileName, 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading File:",  err);
        } try {
            const content = JSON.parse(data);
            content.notes[content.nextId] = inputString;
            let newnextId = parseInt(content.nextId) + 1;
            content.nextId = newnextId;
            const jsonString = JSON.stringify(content, null, 2);
            fs.writeFile(FileName, jsonString, err => {
                if (err) {
                    console.log('Error writing JSON File: ', err);
                }    
            })
        } catch (err) {
            console.log("Error parsing JSON string: ", err);
        } 
    });
}

module.exports = createnote;