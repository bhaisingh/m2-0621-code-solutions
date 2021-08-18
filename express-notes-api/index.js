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

app.get('/api/notes/:id', (req, res) => {
    if (parseInt(req.params.id) <= 0 &&  typeof req.params.id !== 'number' && req.params.id % 1 !== 0) {
        res.status(400);
        res.json({"error": "id must be a positive number"})
    } else {
        fs.readFile(inputFileName, 'utf8', (err, data) => {
            if (err) {
                console.log("Error reading File:",  err);
            } try {
                const content = JSON.parse(data);
                const outArray = [];
                for (const outObj in content.notes) {
                    if (content.notes[outObj].id === parseInt(req.params.id)) {
                        outArray.push({
                            "content": content.notes[outObj].content,
                            "id": content.notes[outObj].id
                        })
                    }
                }
                if (outArray.length > 0) {
                    res.status(200);
                    res.json(outArray);
                } else {
                    res.status(404);
                    res.json({"error": "cannot find note with id " + req.params.id})
                }
            } catch (err) {
                console.log("Error parsing JSON string: ", err);
            } 
            
        })
    }
});


app.listen(3000, () => {
    console.log('Listening on port 3000!');
})