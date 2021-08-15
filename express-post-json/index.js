const express = require('express')
const app = express()

let nextId = 1
let grades = {}

app.use(express.json());

app.get('/api/grades', function (req, res)  {
    let gradeOut = []
    for (let grade in grades) {
        gradeOut.push(grades[grade]);
    }
    res.json(gradeOut);
})

app.listen(3000, () => {
    console.log('Express server listening on port 3000!');
});

app.post('/api/grades', function (req, res) {
    if (req.body.name === undefined || req.body.course === undefined || req.body.score === undefined) {
        res.status(400)
        res.send('Bad Request!');
    }
    grades[nextId] = req.body;
    grades[nextId].id = nextId
    res.status(201);
    res.send(grades[nextId])
    nextId++

})