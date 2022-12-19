const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express();

app.use(cors())
app.use(express.json())

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bank'
})

const port = 3001

app.listen(port || 3001, () => console.log('listening on port:' + port))

app.post('/signin', (req, res) => {

    const email = req.body.email
    const password = req.body.password


        const SQL = "select * from users where email = ? and password = ?"

        db.query(SQL, [email, password], (err, result) => {

            if(err) throw err

            if(result.length > 0){
                res.send({userExists: true, user: result[0]})
            }
            else{
                res.send({userExists: false})
            }


        })

})

app.post('/signup', (req, res) => {

    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const password = req.body.password

    const SQL = "select * from users where email = ?"

    db.query(SQL, [email], (err, result) => {
        
        if(result.length <= 0){

            const INSERT_SQL = "insert into users (first_name, last_name, email, password) values (?, ?, ?,?)"

            db.query(INSERT_SQL, [first_name, last_name, email, password], (err2, result2) => {

                if(err) throw err

                if(result2.affectedRows > 0){
                    res.status(200).send({userCreated: true})
                }

            })

        }
       
    })

})

app.post('/storesid', (req, res) => {

    let newSID = req.body.newSID
    let oldSID = req.body.oldSID
    let id = req.body.id
    let newSession = req.body.newSession

    const gettingUser = req.body.gettingUser

    let SEARCH_SQL = "SELECT * FROM sessionsid WHERE sessionId = ? AND userId = ?"

    if(newSession){
        
        INSERT_SQL = "INSERT INTO sessionsid (sessionId, userId) VALUES (?, ?)"

        db.query(INSERT_SQL, [newSID, id], (err, result) => {

            if(result.affectedRows > 0){
                res.send(result)
            }
            
            if(err) throw err
        })

    }

    else{

        if(gettingUser){
            oldSID = req.body.sessionId
            id = req.body.userId
            console.log(oldSID, id)
        }

        db.query(SEARCH_SQL, [oldSID, id], (err, result) => {

            if(result.length > 0){

                if(!gettingUser){

                    const UPDATE_SQL = "UPDATE sessionsid SET sessionId = ? WHERE userId = ?"

                    db.query(INSERT_SQL, [newSID, id], (err2, result2) => {

                        if(result2.affectedRows > 0){
                            res.send(result2)
                        }

                        if(err2) throw err2

                    })
                }
                else{
                    console.log('select')

                    db.query("SELECT * FROM users WHERE id = ?", [id],(err, result3) => {

                        if(result3.length > 0){
                            res.send({user: result3[0]})
                            console.log(result3[0])
                        }

                    })
                }

            }

        if(err) throw err

    })

    }
    

})
