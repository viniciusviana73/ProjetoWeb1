const MongoClient = require('mongodb').MongoClient

module.exports = class Noticias {
    static async find(titulo) {
        const conn = await MongoClient.connect('mongodb://localhost:27017/ProjetoWeb'),
              db = conn.db()
        let result
        
        if (titulo) {
            result = await db.collection('Noticias')
                             .find({
                                    title : new RegExp('^' + titulo.toUpperCase()) || new RegExp('^' + titulo.toLowerCase()), 
                                    title : { '$regex' : titulo, '$options' : 'i' }
                                   }).toArray()
        } else {
            result = await db.collection('Noticias').find().toArray()
        }
        conn.close()
        return result
    }

    static async insert(title, content) {
        if (title && content){
            let date = new Date().toLocaleString("pt-br")
            const conn = await MongoClient.connect('mongodb://localhost:27017/ProjetoWeb'),
                  db = conn.db()

            await db.collection('Noticias')
                    .insertOne({
                                title: title,
                                content: content,
                                pTime: date
                               })
            conn.close()
            console.log('Matéria cadastrada!')
        } else {
            console.log('Preencha todos os campos.')
        }
    }
}