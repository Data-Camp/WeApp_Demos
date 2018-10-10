import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'
import favicon from 'serve-favicon'
import log4js from 'log4js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import cors from 'cors'
import connect from 'connect'
import jwt from 'express-jwt'
import sessionMongoose from 'session-mongoose'

import mongo from './db/mongo'
import config from './config'
import mkdirs from './common/mkdirs'
import logger from './common/logger'
import tools from './middlewares/tools'
import jwtauth from './middlewares/jwtauth'
import routes from './routes'

const app          = express()
const mkdirsSync   = mkdirs.mkdirsSync
const SessionStore = sessionMongoose(connect)
const mongodb      = new mongo(app, config)
const store        = new SessionStore({ url: mongodb.dblink })
const auth         = new jwtauth()

// 判断文件夹是否存在, 若不存在则创建之
mkdirsSync(config.upload.tmp)
mkdirsSync(config.upload.path)

// view engine setup
app.set('views', path.join(__dirname, 'views') )
app.set('view engine', 'hbs')
app.engine('hbs', exphbs({
	layoutsDir: path.join(__dirname, 'views/layouts/'),
	defaultLayout: 'main',
	extname: '.hbs',
	helpers: {
		time: Date.now
	}
}))

app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(log4js.connectLogger(logger('normal'), {level:'auto', format:':method :url :status'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser(config.secret))

// set session.
app.use(session({
	store: store,
	cookie: {
		maxAge: 60000,
	},
	resave: false,
	saveUninitialized: true,
	secret: config.secret
}))

app.use(cors())

app.use((req, res, next) => {
	if(req.path.indexOf('/api') === -1) {
		return res.render('index')
	}
	return next()
})

// index
// app.get('/', (req, res) => {
// 	res.render('index')
// })

// custom middleware
app.use(/\/api/, tools)
app.use(/^((?!sign\/up|sign\/in|captcha).)+$/, [
	jwt({ secret: config.secret}), 
	auth.verifyToken.bind(auth)
])

// 加载路由
routes(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found')
	err.status = 404
	// res.status(404)
	// res.send('Not Found')
	next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		console.log(err)
		res.status(err.status || 500)
		res.render('error', {
			layout: false,
			message: err.message,
			error: err
		})
	})
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.render('error', {
		layout: false,
		message: err.message,
		error: err
	})
})

// app.listen(3000, '0.0.0.0')

export default app