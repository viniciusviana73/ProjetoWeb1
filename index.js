let http = require('http'),
    path = require('path'),
    express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'), 
    Users = require('./models/Users'),
    Noticias = require('./models/Noticias')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'view'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    const noticias = await Noticias.find()
    res.render('index', {noticias: noticias})
})

app.post('/cadastrar_user', async (req, res) => {
    let login = req.body.login,
        password = req.body.password

    if (await Users.cadastrar(login, password)){
        console.log('Usuário cadastrado!')
        res.redirect('/')
    } else {
        res.end('Falha ao cadastrar.')
    }
})

app.post('/logar', async (req, res) => {
    let login = req.body.login,
        password = req.body.password

        if (await Users.find(login, password)){
            res.cookie('login', login)
            console.log(`Logado! Cookies criados. -> ${req.cookies.login}`)
            res.redirect('/')
        } else {
            console.log('Erro ao logar.')
            res.status(403)
            res.end()
        }
})

app.post('/cadastrar_noticia', async (req, res) => {
    let title = req.body.titulo,
    content = req.body.conteudo

    if (!req.body || title == '' || content == '') {
        res.status(400)
        res.end()
    } else {
        await Noticias.insert(title, content)
        res.redirect('/')
    }    
})

app.get('/buscar_post', async (req, res) => {
    let titulo = req.query.titulo
    const noticias = await Noticias.find(titulo)
    res.render('index', {noticias: noticias})
})

app.listen(3000, () => {
    console.log(`Server running now on http://localhost:3000`)
})