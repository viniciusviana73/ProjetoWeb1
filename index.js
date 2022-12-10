let http = require('http'),
    path = require('path'),
    express = require('express'),
    app = express(),
    //cookieParser = require('cookie-parser'), 
    Users = require('./models/Users')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'view'))
app.use(express.static(path.join(__dirname, 'public')))
//app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/index', (req, res) => {
    res.render('index')
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
            //res.cookie('login', login)
            console.log(`Logado! Cookies criados.`)
            res.redirect('/')
        } else {
            console.log('Erro ao logar.')
        }
})

app.listen(3000, () => {
    console.log(`Server running now on http://localhost:3000`)
})