const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();
const MongoConnect = process.env.MONGO_URI;
const client = new MongoClient(MongoConnect);
const dbName = "Projeto_Web"

module.exports = class Noticias {
    static async find(termo) {
        await client.connect()
        const db = client.db(dbName),
              col = db.collection("Noticias")
        let result
        
        if (termo) {
            result = await db.collection('Noticias')
                                .find({ $or :
                                        [{ title : { '$regex' : termo, '$options' : 'i' }},
                                         { content : { '$regex' : termo, '$options' : 'i' }}]
                                      }).toArray() 
        } else {
            result = await db.collection('Noticias').find().toArray()
        }
        await client.close();
        return result
    }

    static async insert(title, content, image) {
        if (title && content && image){
            await client.connect()
            const db = client.db(dbName),
                  col = db.collection("Noticias")
            let date = new Date().toLocaleString("pt-br")
            
            await col.insertOne({
                                title: title,
                                content: content,
                                image: image,
                                pTime: date
                                })
            await client.close();
            console.log('Matéria cadastrada!')
        } else {
            console.log('Preencha todos os campos.')
        }
    }
}