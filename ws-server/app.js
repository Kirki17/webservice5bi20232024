const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const service = express();

const parametriConnessioneDB = {
    host: 'db.-server',
    user: 'root',
    password: 'root',
    database: 'gestione_ticket'
};

const connessione = mysql.createConnection(parametriConnessioneDB);

service.use(cors());

service.get('/', (request, response) => {
    response.sendFile(__dirname + '/help.html');
});

service.get('/users', (req,res) => {
    let queryString ='SELECT * from users';
    connessione.query(queryString, (error, dati) => {
        if(!error){
            res.json(dati);
        } else {
            res.status(500).send(error);
        }
    })
});

const server = service.listen(3000, () => {
    console.log('Server in esecuzione...');
});