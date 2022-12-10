const MongoClient = require('mongodb').MongoClient

module.exports = class Users {
    static async find(login, password) {
        const conn = await MongoClient.connect('mongodb://localhost:27017/ProjetoWeb'),
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
        const conn = await MongoClient.connect('mongodb://localhost:27017/ProjetoWeb'),
              db = conn.db()
        
        if (await db.collection('Users').insertOne({login: login, password: password})) {
            conn.close()
            return true
        }
        conn.close()
        return false
    }
}