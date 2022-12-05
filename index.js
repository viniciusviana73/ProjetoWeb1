let http = require('http'),
    path = require('path'),
    express = require('express'),
    app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'view'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.get('/index', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log(`Server running now on http://localhost:3000`)
})