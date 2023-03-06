var express = require('express');

const client = require('./database');

/*const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "",
    database: "todo_list"
})
*/
const path = require('path');
const _dirname = path.resolve();
//var serviceAccount = require("./key.json");


const request = require("request");

app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname)))

app.use(express.static(path.join(__dirname + '/views')))

//console.log(obj);

let d = [{
    title: 'Assignment',
    duedate: '2023-03-05T18:30:00.000Z',
    completed: false
},
{
    title: 'Assignment',
    duedate: '2023-03-05T18:30:00.000Z',
    completed: false
}]

let obj = [{}];


app.get('/', function (req, res) {
    res.send("success");
})


app.get('/start', function (req, res) {
    (async () => {
        await client.query('select * from todo_table',
            function (error, response, result) {
                var overdue = [];
                var duetoday = [];
                var duelater = [];
                for (let i = 0; i < result.rowCount; i++) {
                    if (new Date(result.rows[i].duedate) < new Date()) {
                        overdue.push(result.rows[i]);
                    } else if (new Date(result.rows[i].duedate) > new Date()) {
                        duelater.push(result.rows[i]);
                    } else {
                        duetoday.push(result.rows[i]);
                    }
                }

                res.render('home', {

                    overDue: overdue,
                    dueToday: duetoday,
                    dueLater: duelater

                });
                res.sendFile(__dirname + '/views/home.ejs');

            })

    });
});








app.listen(3000);
