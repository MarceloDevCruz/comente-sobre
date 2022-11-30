const express = require('express')
const exphbs = require("express-handlebars")
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

const port = process.env.PORT || 3000

/* MODELS */
const ComenteSobre = require('./models/ComenteSobre')
const User = require('./models/User')

//IMPORT ROUTES
const ComenteSobreRoutes = require('./routes/ComenteSobreRoutes')
const AuthRoutes = require('./routes/AuthRoutes')

//CONTROLLER
const comenteSobreController = require('./controllers/ComenteSobreController')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(
  session({
    name: 'session',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () { },
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 2 * 60 * 60 * 1000,
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      httpOnly: true
    }
  }),
)

app.use(flash())

app.use(express.static('public'))

app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session
  }

  next()
})

// Rotas
app.use('/comentesobre', ComenteSobreRoutes)
app.use('/', AuthRoutes)

app.get('/', comenteSobreController.showComenteSobre)

// .sync({ force: true })
conn.sync().then(() => { app.listen(port) }).catch((err) => console.log('err'))