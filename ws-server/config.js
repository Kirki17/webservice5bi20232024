const config = {
    dbParams: {
        host: 'sqlserver',
        user: 'root',
        password: 'root',
        database: 'gestione_ticket'
    },
    serverPort: 3000,
    secret:'cisco',
    saltRounds: 10,
    baseUrls : {
        users: '/users'
    },
    secretPhrase: 'Nel mezzo di cammin di nostra vita mi ritrovai per una selva oscura che la diritta via era smarrita'
}

module.exports = config;