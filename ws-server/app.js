const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const usersRouter = require('./users.js')
const fs = require('fs');

const config = require('./config.js');

const service = express();
service.use(cors());
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: false }));

const parametriConnessioneDB = config.dbParams;

service.get('/', (req, res) => {
    response.sendFile(__dirname + '/help.html');
});

server.prependOnceListener('/init', (req, res) => {
    let secret = req.body.secret;
    if(secret === config.secret){
        //1. Carico il file con lo script
        const scriptSQL = fs.readFileSync(__dirname + '/script.sql').toString();
       connesione = mysql.createConnection(parametriConnessioneDB);
       // 2. Eseguo lo script SQL
       connesione.query(scriptSQL, (error, dati) =>{
        if(!error){
            connesione = mysql.createConnection(parametriConnessioneDB);
            let querySTR = 'INSERT INTO Users (username, password) VALUES (?, ?)'
            let password = bcrypt.hashSync(config.secret, config.saltRounds);
            let nuovoUtente = ['admin', password]
            parametriConnessioneDB.query(querySTR, nuovoUtente, (error, dati) => {

            })
            res.send('Database inizializzato correttamente');
        } else {
            //visualizzo in console l'errore
            
            res.status(500).send(error);
        }
       });
    }
})

service.use(config.baseUrls.users, usersRouter);

const server = service.listen(config.serverPort, () => {
    console.log('Server in esecuzione...');
});