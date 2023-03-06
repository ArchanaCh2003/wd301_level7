const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgresql",
    database: "todo_list"
})
//==================
/*
let obj = [{}];

(() => {
    client.connect();
    const result = client.query('select * from todo_table');

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
//========================*/

client.on("connect", () => {
    console.log("Database connection");
})

client.on("end", () => {
    console.log("Connection end");
})


module.exports = client;