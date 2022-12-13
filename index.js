let http = require('http'),
    path = require('path'),
    express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'view'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use(require('./server/routes/router'))

app.listen(3000, () => {
    console.log(`Server running now on http://localhost:3000`)
})