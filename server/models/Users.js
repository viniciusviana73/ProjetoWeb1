const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv');
dotenv.config();
const MongoConnect = process.env.MongoClient;
const client = new MongoClient(MongoConnect);

module.exports = class Users {
    static async find(login, password) {
        const conn = await client.connect(),
              db = conn.db()
        let res = false
        
        if (login && password) {
            if (await db.collection('Users').findOne({login: login, password: password})) {
                console.log('Logado.')
                res = true
            } else {
                console.log('Dados inválidos!')
                res = false
            }
        } else {
            console.log('Preencha todos os campos!')
        }        
        conn.close()
        return res
    }

    static async cadastrar(login, password) {
        const conn = await client.connect(),
              db = conn.db()
        
        if (await db.collection('Users').insertOne({login: login, password: password})) {
            conn.close()
            return true
        }
        conn.close()
        return false
    }
}