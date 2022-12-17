const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv');
dotenv.config();
const MongoConnect = process.env.MONGO_URI;
const client = new MongoClient(MongoConnect);
const dbName = "Projeto_Web"

module.exports = class Users {
    static async find(login, password) {
        try {
            await client.connect()
            const db = client.db(dbName),
                  col = db.collection("Users")
            let res = false
            
            if (login && password) {
                if (await col.findOne({login: login, password: password})) {
                    console.log('Logado.')
                    res = true
                } else {
                    console.log('Dados inválidos!')
                    res = false
                }
            } else {
                console.log('Faltando parâmetros.')
            }        
            return res
        } catch (error) {
            console.log(`Erro Users.find() -> ${error}`)
        } finally {
            await client.close()
        }        
    }

    static async cadastrar(username, login, password, userType) {
        try {
            await client.connect()
            const db = client.db(dbName),
                  col = db.collection("Users")

            if (!await this.checkMail(login)) {
                if (await col.insertOne({
                                    username: username,
                                    login: login, 
                                    password: password,
                                    userType: userType
                                    })) {
                    return true
                }
            } else {
                console.log(`E-mail já cadastrado no banco de dados.`)
                return false
            }
        } catch (error) {
            console.log(`Erro Users.cadastrar() -> ${error}`)
        } finally {
            await client.close()
        }
    }

    static async checkType(login) {
        try {
            await client.connect()
            const db = client.db(dbName),
                  col = db.collection("Users")            
            let users = await col.findOne({login: login})
            return users.userType
        } catch (error) {
            console.log(error)
        } finally {
            await client.close()
        }
    }

    static async checkMail(login) {
        try {
            const db = client.db(dbName),
                  col = db.collection("Users")            
            if (await col.findOne({login: login})) {
                // E-mail já cadastrado
                return true
            }
            // E-mail disponível
            return false
        } catch (error) {
            console.log(`Erro Users.checkMail() -> ${error}`)
        } 
    }
}