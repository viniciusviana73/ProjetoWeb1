let express = require('express'),
    router = express.Router(),
    Users = require('../models/Users'),
    Noticias = require('../models/Noticias'),
    upload = require('../models/Uploads'),
    session = require('express-session')

router.use(session({
    secret: 'supersecretsessionkey',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

router.get('/', async (req, res) => {
    if (req.session && req.session.login){
        console.log(`\n -> Variável de session.login da requisição: ${req.session.login}`)
        if (req.session.userTypeAdmin) {
            const noticias = await Noticias.find()
            console.log(req.session)
            res.render('index', { noticias: noticias, user: req.session.login, admin: req.session.userTypeAdmin })
        } else {
            const noticias = await Noticias.find()
            console.log(req.session)
            res.render('index', { noticias: noticias, user: req.session.login })
        }
    } else {
        console.log('\n -> Requisição de acesso não possui variável de session.login')
        console.log(req.session)
        res.render('login')
    }
});

router.post('/cadastrar_user', async (req, res) => {
    const login = req.body.login,
          password = req.body.password,
          username = req.body.username,
          userType = 'normal'

    if (await Users.cadastrar(username, login, password, userType)) {
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
        req.session.login = login
        console.log(`Variável de session.login criada -> ${req.session.login}`)
        if (await Users.checkType(login) == 'admin') {
            req.session.userTypeAdmin = true
        }
        // Exibir mensagem de sucesso antes de redirecionar para index
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

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log('Sessão destruída!')
      })
    res.redirect('/')
})

module.exports = router