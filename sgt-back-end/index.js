const express = require('express');
const app = express();

const pg = require('pg');
// only create ONE pool for your whole server
const db = new pg.Pool({
    connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
    ssl: {
      rejectUnauthorized: false
    }
  });

// returns all rows from the "grades" table.

app.get('/api/grades', (req, res, next) => {

    const sql = `
    select "gradeId",
           "name",
           "course",
           "score",
           "createdAt"
      from "grades"
     `;

    db.query(sql)
      .then(result => {
        const outArray = [];
        for (let i = 0; i < result.rows.length; i++) {
            outArray.push({
                "gradeId": result.rows[i].gradeId,
                "name": result.rows[i].name,
                "course": result.rows[i].course,
                "score": result.rows[i].score,
                "createdAt": result.rows[i].createdAt
            })
        }
        res.status(200)
        res.json(outArray);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
            error: 'An unexpected error occurred'
        });
    });
});

app.use(express.json());

//nserts a new grade into the "grades" table and returns the created grade.
app.post('/api/grades', (req, res, next) => {
    if (req.body.name === undefined || req.body.course === undefined || req.body.score === undefined || 
        req.body.score % 1 !== 0 || req.body.score < 0 || req.body.score > 100 ) {
            res.status(400).json({
                error: 'Request parameter are not correct'
            })
            return;
    }

    const sql = `
        Insert into grades (name, course, score)
            values($1, $2, $3)
            returning *
    `
    const values = [req.body.name, req.body.course, req.body.score]

    db.query(sql, values)
        .then(result => {
            res.status(201).json(result.rows)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'An unexpected error occurred'
            })
        })
});


// updates a grade in the "grades" table and returns the updated grade

app.put('/api/grades/:gradeId', (req, res, next) => {
    if (parseInt(req.params.gradeId) <= 0 || req.params.gradeId % 1 !== 0) {
        res.status(400).json({
            error: 'grade ID should be numeric'
        })
        return;
    } else 
    if (req.body.name === undefined || req.body.course === undefined || req.body.score === undefined || 
        req.body.score % 1 !== 0 || req.body.score < 0 || req.body.score > 100 ) {
            res.status(400).json({
                error: 'Parameters values are not correct'
            })
            return; 
        }

    const sql = `
        update grades
        set "name" = $1,
            "course" = $2,
            "score" = $3
        where "gradeId" = $4
        returning *
     `;
    const values = [req.body.name, req.body.course, req.body.score, req.params.gradeId]

    db.query(sql, values)
        .then(result => {
            if (result.rows.length > 0) {
                res.status(200).json(result.rows)
            } else {
                res.status(404).json({
                    error: 'Grade Id does not exist'
                })
            }   
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'An unexpected error occurred'
            })
        })
});


// deletes a grade from the "grades" table

app.delete('/api/grades/:gradeId', (req, res, next) => {
    if (parseInt(req.params.gradeId) <= 0 || req.params.gradeId % 1 !== 0) {
        res.status(400).json({
            error: 'grade ID should be numeric'
        })
        return;
    } 
    const sql = `
        delete from grades
        where "gradeId" = $1
        returning *
     `;

    const values = [req.params.gradeId]

    db.query(sql, values)
        .then(result => {
            if (result.rows.length > 0) {
                console.log('hi 204');
                res.status(204).json()
            } else {
                res.status(404).json({
                    error: 'Grade Id does not exist'
                })
            }
            return;
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'An unexpected error occurred'
            })
        })
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
})