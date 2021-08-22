const express = require('express');
const app = express();
const fs = require('fs');
const inputFileName = 'data.json'

// Clients can GET a list of notes.

app.get('/api/notes', (req, res) => {

    fs.readFile(inputFileName, 'utf8', (err, data) => {
        if (err) {
            res.status(500);
            res.json({"error": "Error reading data file"})
        } else {
            try {
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
                res.status(500);
                res.json({"error": "Error parsing JSON string"})
            }
        } 
    });
})


// Clients can GET a single note by id.


app.get('/api/notes/:id', (req, res) => {
    if (parseInt(req.params.id) <= 0 || typeof parseInt(req.params.id) !== 'number' || parseInt(req.params.id) % 1 !== 0) {
        res.status(400);
        res.json({"error": "id must be a positive number"})
    } else {
        fs.readFile(inputFileName, 'utf8', (err, data) => {
            if (err) {
                res.status(500);
                res.json({"error": "Error reading data file"})
            } else {
                try {
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
                        res.json(outArray[0]);
                    } else {
                        res.status(404);
                        res.json({"error": "cannot find note with id " + req.params.id})
                    }
                } catch (err) {
                    res.status(500);
                    res.json({"error": "Error parsing JSON string"})
                } 
            }
        })
    }
});

// Clients can POST a new note.

app.use(express.json())

app.post('/api/notes', (req, res) => {
    if (req.body.content === undefined) {
        res.status(400);
        res.json({"error": "content is a required field"})
    } else {
        fs.readFile(inputFileName, 'utf8', (err, data) => {
            if (err) {
                res.status(500);
                res.json({"error": "Error reading data file"})
            } else {
                try {
                    const content = JSON.parse(data);
                    const writeObj = {
                        "content": req.body.content,
                        "id": content.nextId
                    }
                    let nextId = content.nextId
                    content.notes[nextId] = writeObj;
                    content.nextId++;
                    data = JSON.stringify(content, null, 2);
                    fs.writeFile(inputFileName, data, (err) => {
                        if (err) {
                            res.status(500);
                            res.json({"error": "An unexpected error occurred."})
                        } else {
                            res.status(201);
                            res.json(writeObj);
                        }
                    })
                } catch (err) {
                    res.status(500);
                    res.json({"error": "Error parsing JSON string"})
                }
            } 
        })
    }
})


// Clients can DELETE a note by id.

app.delete('/api/notes/:id', (req, res) => {
    if (parseInt(req.params.id) <= 0 || typeof parseInt(req.params.id) !== 'number' || parseInt(req.params.id) % 1 !== 0) {
        res.status(400);
        res.json({"error": "id must be a positive number"})
    } else {
        fs.readFile(inputFileName, 'utf8', (err, data) => {
            if (err) {
                res.status(500);
                res.json({"error": "Error reading data file"})
            } else {
                try {
                    let content = JSON.parse(data);
                    let notesValue ;
                    for (const outObj in content.notes) {
                        if (content.notes[outObj].id === parseInt(req.params.id)) {
                            notesValue = content.notes[outObj];
                            delete content.notes[outObj];
                        }
                    }
                    content = JSON.stringify(content, null, 2);
                    fs.writeFile(inputFileName, content, (err) => {
                        if (err) {
                            res.status(500);
                            res.json({"error": "An unexpected error occurred."})
                        } else if (notesValue === undefined) {
                            res.status(404);
                            res.json({"error": `note with id ${req.params.id} does not exist`})
                        } else {
                            res.sendStatus(204);
                        }
                    })
                } catch (err) {
                    res.status(500);
                    res.json({"error": "Error parsing JSON string"})
                } 
            }
        })
    }
})

// Clients can replace a note (PUT) by id.

app.put('/api/notes/:id', (req, res) => {
    if (parseInt(req.params.id) <= 0 || typeof parseInt(req.params.id) !== 'number' || parseInt(req.params.id) % 1 !== 0) {
        res.status(400);
        if (req.body.content === undefined) {
            res.json({"error": "Content is a required parameter"})
        } else {
            res.json({"error": "id must be a positive number"})
        }
    } else {
        fs.readFile(inputFileName, 'utf8', (err, data) => {
            if (err) {
                res.status(500);
                res.json({"error": "Error reading data file"})
            } else {
                try {
                    let content = JSON.parse(data);
                    let notesValue ;
                    for (const outObj in content.notes) {
                        if (content.notes[outObj].id === parseInt(req.params.id)) {
                            content.notes[outObj].content = req.body.content;
                            notesValue = content.notes[outObj];
                        }
                    }
                    content = JSON.stringify(content, null, 2);
                    fs.writeFile(inputFileName, content, (err) => {
                        if (err) {
                            res.status(500);
                            res.json({"error": "An unexpected error occurred."})
                        } else if (notesValue === undefined) {
                            res.status(404);
                            res.json({"error": `note with id ${req.params.id} does not exist`})
                        } else {
                            res.status(200);
                            res.json(notesValue);
                        }
                    })
                } catch (err) {
                    res.status(500);
                    res.json({"error": "Error parsing JSON string"})
                }
            } 
        })
    }
})


app.listen(3000, () => {
    console.log('Listening on port 3000!');
})