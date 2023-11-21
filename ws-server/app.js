const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const usersRouter = require('./users.js')
const jwt = require('jsonwebtoken');
const fs = require('fs');

const config = require('./config.js');

const service = express();
service.use(cors());
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: false }));

const parametriConnessioneDB = config.dbParams;

config.secret = fs.readFileSync('/run/secrets/init_secret', 'utf8');
config.dbParams.secret = fs.readFileSync('/run/secrets/root_db_password', 'utf8');
config.dbParamsInit.password = config.dbParams.password;

service.get('/', (req, res) => {
    res.sendFile(__dirname + '/help.html');
});

service.post('/init', (req, res) => {
    let secret = req.body.secret;
    if (secret === config.secret) {
        //1. Carico il file con lo script
        const scriptSQL = fs.readFileSync(__dirname + '/script.sql','utf8');
        connesione = mysql.createConnection(config.dbParamsInit);
        // 2. Eseguo lo script SQL
        connesione.query(scriptSQL, (error, dati) => {
            connessione.end(() => { });
            if (!error) {
                connessione = mysql.createConnection(config.dbParamsInit);
                let querySTR = 'INSERT INTO Users (username, password) VALUES (?, ?)';
                let adminPassword = fs.readFileSync('/run/secrets/admin_ws_password', 'utf8');
                let password = bcrypt.hashSync(config.secret, config.saltRounds);
                let nuovoUtente = ['admin', password]
                connessione.query(querySTR, nuovoUtente, (error, dati) => {
                    if(!error){
                        connessione.end(() => { });
                        res.status(200).send('Database inizializzato correttamente');
                    } else {
                        res.status(500).send(error);
                    }
                })
                res.send('Database inizializzato correttamente');
            } else {
                //visualizzo in console l'errore
                res.status(500).send(error);
            }
        });
    }
})

service.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        const connessione = mysql.createConnection(parametriConnessioneDB);
        let querySTR = 'SELECT * FROM Users WHERE username = ?';
        connessione.query(querySTR, username, (error, dati) => {
            if (!error) {
                if (dati.length > 0) {
                    let user = dati[0];
                    let passwordHash = user.password;
                    if (bcrypt.compareSync(password, passwordHash)) {
                        //creare un token bearer ed inviarlo al client
                        //il token deve contenere:
                        // - username
                        // - data di creazione
                        // - data di scadenza (24 ore)
                        // - ruolo (admin, user)

                        let token = {};
                        token.username = user.username;
                        token.data_creazione = new Date();
                        token.data_scadenza = new Date();
                        token.data_scadenza.setDate(token.data_creazione.getDate() + 1)
                        token.ruolo = 'admin';

                        let tokenBearer = jwt.sign(token, config.secretPhrase);
                        res.json({ token: tokenBearer });
                    } else {
                        res.status(401).send('Unauthorized');
                    }
                } else {
                    res.status(401).send('Unauthorized');
                }
            }
            res.status(500).send(error);
        })
        connessione.end(() => { });
    } else {
        express.status(401).send('Unauthorized')
    }
})

service.use(config.baseUrls.users, usersRouter);

const server = service.listen(config.serverPort, () => {
    console.log('Server in esecuzione...');
});