const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();
const MongoConnect = process.env.MongoClient;
const client = new MongoClient(MongoConnect);


module.exports = class Noticias {
    static async find(termo) {
        const conn = await client.connect(),
              db = conn.db()
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
        conn.close()
        return result
    }

    static async insert(title, content, image) {
        if (title && content && image){
            let date = new Date().toLocaleString("pt-br")
            const conn = await client.connect(),
                  db = conn.db()

            await db.collection('Noticias')
                    .insertOne({
                                title: title,
                                content: content,
                                image: image,
                                pTime: date
                               })
            conn.close()
            console.log('Matéria cadastrada!')
        } else {
            console.log('Preencha todos os campos.')
        }
    }
}