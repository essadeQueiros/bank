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

app.post('/login', (req, res) => {

    const email = req.body.email
    const password = req.body.password

    const SQL = "select * from users where email = ? and password = ? and active = 1"

    db.query(SQL, [email, password], (err, result) => {

        console.log(err, result)

        if(err){
            res.status(400).send(err)
        }

        if(result){
            res.status(200).send(result)
        }


    })

})