var express = require('express');

const client = require('./database');

/*const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgresql",
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
/*
(async () => {
    await client.connect();
    const result = await client.query('select * from todo_table');

    //const result = await client.query('insert into todo_table(title,duedate,completed)
    //values($1,$2,$3)',[parameters]);
    //console.log(result.rows);
    console.log(result.rowCount);
    for (let i = 0; i < result.rowCount; i++) {
        console.log(result.rows[0]);
        //let date = client.query('select duedate::date from todo_table where title=$1',[result.rows[i].title]);
        //console.log(date);
    }
    obj = result.rows;
    //let d = obj[0].duedate;
    //console.log(new Date(d) < new Date());
    //client.end();
})();


*/

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

/*const result = client.query('select * from todo_table', () => {
    let t1 = result.rows[0].title;
    console.log(t1);
})


app.get('/start', function (req, res) {


    res.render('home', {

        title: 'Assignment',
        duedate: '2023-03-05T18:30:00.000Z',
        completed: false

    });
    res.sendFile(__dirname + '/views/home.ejs');

})

  */

/*res.render('home', {
    output: [{
        title: 'Assignment',
        duedate: '2023-03-05T18:30:00.000Z',
        completed: false
    },
    {
        title: 'Assignment',
        duedate: '2023-03-05T18:30:00.000Z',
        completed: false
    }]
    ,
})*/









app.listen(3000);