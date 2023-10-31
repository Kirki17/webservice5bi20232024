const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const service = express();

service.use(cors());
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: false }));

const parametriConnessioneDB = {
    host: 'sqlserver',
    user: 'root',
    password: 'root',
    database: 'gestione_ticket'
};

service.get('/', (request, response) => {
    response.sendFile(__dirname + '/help.html');
});

service.get('/users', (req, res) => {
    const connessione = mysql.createConnection(parametriConnessioneDB);
    let queryString = 'SELECT * FROM Users';
    connessione.query(queryString, (error, dati) => {
        if (!error) {
            res.json(dati);
        } else {
            res.status(500).send(error);
        }
    })
    connessione.end(() => { });
});

service.get('/users/:id', (req, res) => {
    const connessione = mysql.createConnection(parametriConnessioneDB);
    let id = req.params.id;
    if (id) {
        let queryString = 'SELECT * FROM Users WHERE id = ?';
        connessione.query(queryString, id, (error, dati) => {
            if (!error) {
                res.json(dati);
            } else {
                res.status(500).send(error);
            }
        })
        connessione.end(() => { });
    }
});

service.delete('/users/:id', (req, res) => {
    const connessione = mysql.createConnection(parametriConnessioneDB);
    let id = req.params.id;
    if (id) {
        let queryString = 'DELETE FROM Users WHERE id = ?';
        connessione.query(queryString, id, (error, dati) => {
            if (!error) {
                res.json(dati);
            } else {
                res.status(500).send(error);
            }
        })
        connessione.end(() => { });
    }
});

service.post('/users', (req, res) => {
    let nuovoUtente = [req.body.nome, req.body.cognome, req.body.data_nascita,
    req.body.email, req.body.username, req.body.password];
    console.log(nuovoUtente);
    const connessione = mysql.createConnection(parametriConnessioneDB);
    let queryString = 'INSERT INTO Users (nome, cognome, data_nascita, email, username, password) VALUES (?, ?, ?, ?, ?, ?)';
    connessione.query(queryString, nuovoUtente, (error, dati) => {
        if (!error) {
            res.json(dati);
        } else {
            res.status(500).send(error);
        }
    })
    connessione.end(() => { });
});

const server = service.listen(3000, () => {
    console.log('Server in esecuzione...');
});