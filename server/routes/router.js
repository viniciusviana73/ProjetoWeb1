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
        if (req.session.userTypeAdmin) {
            const noticias = await Noticias.find()
            //console.log(req.session)
            res.render('index', { noticias: noticias, user: req.session.login, username: req.session.username, admin: req.session.userTypeAdmin })
        } else {
            const noticias = await Noticias.find()
            //console.log(req.session)
            res.render('index', { noticias: noticias, user: req.session.login, username: req.session.username })
        }
    } else {
        //console.log('\n -> Requisição de acesso não possui variável de session.login')
        //console.log(req.session)
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

router.post('/cadastrar_admin', async (req, res) => {    
    if (req.session && req.session.login && req.session.userTypeAdmin) {
        const login = req.body.login,
        password = req.body.password,
        username = req.body.username,
        userType = 'admin'
        if (await Users.cadastrar(username, login, password, userType)) {
            console.log('Admin cadastrado!')
            res.redirect('/')
        } else {
            res.end('Falha ao cadastrar.')
        }
    } else {
        res.status(403)
        res.end()
    }
})

router.post('/logar', async (req, res) => {
    const login = req.body.login,
          password = req.body.password

    if (await Users.find(login, password)) {
        req.session.login = login
        req.session.username = await Users.getUsername(login)
        //console.log(`Variável de session.login criada -> ${req.session.login}`)
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
    if (req.file) {
        image = req.file.filename
    }else{
        image = "logo-noticia.png"
    }

    let title = req.body.titulo,
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

router.post('/NoticiasJSON', async (req, res) => {
    console.log(req.body)
    if (req.session && req.session.login){
        let termo = req.body.termo
        if (termo == '') {
            console.log('Campo de busca vazio')
            res.status(400)
        }
    const noticias = await Noticias.searchBar(termo)
        res.json(noticias)
    } 
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log('Sessão destruída!')
      })
    res.redirect('/')
})

module.exports = router