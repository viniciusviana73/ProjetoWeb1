const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();
const MongoConnect = process.env.MONGO_URI;
const client = new MongoClient(MongoConnect);
const dbName = "Projeto_Web"

module.exports = class Noticias {
    static async find(termo) {
        try {
            await client.connect()
            const db = client.db(dbName),
                  col = db.collection("Noticias")
            let result
            
            if (termo) {
                result = await col.find({ $or :
                                            [{ title : { '$regex' : termo, '$options' : 'i' }},
                                             { content : { '$regex' : termo, '$options' : 'i' }}]
                                        }).toArray() 
            } else {
                result = await col.find().toArray()
            }
            return result
        } catch (error) {
            console.log(`Erro Noticias.find() -> ${error}`)
        } finally {
            await client.close()
        }        
    }

    static async insert(title, content, image) {
        if (title && content && image){
            try {
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
                console.log('Matéria cadastrada!')
            } catch (error) {
                console.log(`Erro Noticias.insert() -> ${error}`)
            } finally {
                await client.close()
            }            
        } else {
            console.log('Preencha todos os campos.')
        }
    }

    static async searchBar(termo) {
        try {
            await client.connect()
            const db = client.db(dbName),
                  col = db.collection("Noticias")
            let result = await col.find({ $or :
                                            [{ title : { '$regex' : termo, '$options' : 'i' }},
                                             { content : { '$regex' : termo, '$options' : 'i' }}]
                                        }).toArray() 
            return result
        } catch (error) {
            console.log(`Erro Noticias.find() -> ${error}`)
        } finally {
            setTimeout( async () => {
                await client.close()
              }, 60000)
        }        
    }
}