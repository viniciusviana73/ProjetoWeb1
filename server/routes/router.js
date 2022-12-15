let express = require('express'),
    router = express.Router(),
    Users = require('../models/Users'),
    Noticias = require('../models/Noticias'),
    upload = require('../models/Uploads')

router.get('/', async (req, res) => {
    const noticias = await Noticias.find()
    res.render('index', { noticias: noticias })
});

router.post('/cadastrar_user', async (req, res) => {
    const login = req.body.login,
          password = req.body.password

    if (await Users.cadastrar(login, password)) {
        console.log('Usuário cadastrado!')
        res.redirect('/')
    } else {
        res.end('Falha ao cadastrar.')
    }
})

router.post('/logar', async (req, res) => {
    const login = req.body.login,
          password = req.body.password

    if (await Users.find(login, password)) {
        res.cookie('login', login)
        //console.log(`Logado! Cookies criados. -> ${req.cookies.login}`)
        res.redirect('/')
    } else {
        console.log('Erro ao logar.')
        res.status(403)
        res.end()
    }
})

router.post('/cadastrar_noticia', upload.single('image'), async (req, res) => {
    let image = req.file.filename,
        title = req.body.titulo,
        content = req.body.conteudo

    if (!req.body || title == '' || content == '') {
        res.status(400)
        res.end()
    } else {
        await Noticias.insert(title, content, image)
        res.redirect('/')
    }
})

router.get('/buscar_post', async (req, res) => {
    let termo = req.query.termo
    if (termo == '') {
        console.log('Campo de busca vazio')
        res.status(400)
    }
    const noticias = await Noticias.find(termo)
    res.render('index', { noticias: noticias })
})

module.exports = router