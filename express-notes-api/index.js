const express = require('express');
const app = express();
const fs = require('fs');
const inputFileName = 'data.json'

app.get('/api/notes', (req, res) => {

    fs.readFile(inputFileName, 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading File:",  err);
        } try {
            const content = JSON.parse(data);
            const outArray = [];
            for (const outObj in content.notes) {
                outArray.push({
                    "content": content.notes[outObj].content,
                    "id": content.notes[outObj].id
                })
            }
            res.status(200)
            res.json(outArray);
        } catch (err) {
            console.log("Error parsing JSON string: ", err);
        } 
    });
})

app.listen(3000, () => {
    console.log('Listening on port 3000!');
})