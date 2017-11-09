const { join } = require('path')
const pug = require('pug')
const jwt = require('jsonwebtoken')
const pointOfView = require('point-of-view')
const fastifyStatic = require('fastify-static')
const fastifyFormBody = require('fastify-formbody')

const expectedUsername = process.env.USERNAME || 'luciano'
const expectedPassword = process.env.PASSWORD || 'mariobros'
const jwtSecret = process.env.SECRET || 'secret'

module.exports = (fastify, opts, next) => {
  fastify.register(fastifyFormBody)
  fastify.register(pointOfView, {
    engine: {pug},
    templates: join(__dirname, 'templates'),
    options: {
      pretty: true,
      filename: 'Pug',
      basedir: join(__dirname, 'templates')
    }
  })
  fastify.register(fastifyStatic, {
    root: join(__dirname, 'assets'),
    prefix: '/assets/'
  })

  fastify.get('/', (req, reply) => {
    const sid = req.query.sid

    let error = false
    let session = null

    if (sid) {
      try {
        session = jwt.verify(sid, jwtSecret)
      } catch (err) {
        error = 'Invalid session token'
      }
    }

    reply.view('index.pug', {session, error})
  })

  fastify.get('/login', (req, reply) => {
    console.log(req.query)
    reply.view('login.pug', {hasError: req.query.error})
  })

  fastify.post('/login', (req, reply) => {
    const {username, password} = req.body
    if (
      username !== expectedUsername ||
      password !== expectedPassword
    ) {
      return reply.redirect('/login?error=1')
    }

    // create jwt token
    const jwtToken = jwt.sign({ sub: username, role: 'user' }, jwtSecret)

    // redirect with parameter
    return reply.redirect(`/?sid=${jwtToken}`)
  })

  next()
}
