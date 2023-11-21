const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const config = require('./config.js');
const auth = require('./auth.js');

const router = express.Router();

const parametriConnessioneDB = config.dbParams;

router.use(auth);

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const connessione = mysql.createConnection(parametriConnessioneDB);
    let id = req.params.id;
    console.log(req.params);
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

router.post('', (req, res) => {
    let userPassword = req.body.password;
    let saltRounds = bcrypt.genSaltSync(10);
    let cryptedPassword = bcrypt.hashSync(userPassword, saltRounds);
    console.log(cryptedPassword);
    let nuovoUtente = [req.body.nome, req.body.cognome, req.body.data_nascita,
    req.body.email, req.body.username, cryptedPassword];
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

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let nuovoUtente = [req.body.nome, req.body.cognome, req.body.data_nascita,
    req.body.email, id];
    console.log(nuovoUtente);
    const connessione = mysql.createConnection(parametriConnessioneDB);
    let queryString = 'UPDATE Users SET nome = ?, cognome = ?, data_nascita = ?, email = ? WHERE id = ?';
    connessione.query(queryString, nuovoUtente, (error, dati) => {
        if (!error) {
            res.json(dati);
        } else {
            res.status(500).send(error);
        }
    })
    connessione.end(() => { });
});

module.exports = router;