let express = require('express')
let app = express()
let config = require('./appconfig')
let bodyParser = require('body-parser')

let router = express.Router();

router.get('/api.json', (req, res) => {
    console.log("j")
    res.send(config)
})

router.post('/messages', (req, res) => {
    console.log(req.headers)
    console.dir(req.body.item.room)
    res.status(200)
    res.send({
        color: 'green',
        message: 'Cool (hodor)',
        message_format: 'text'
    })
})

router.post('/register', (req, res) => {
    console.dir(req.body)
    res.status(201)
    res.end()
})

router.delete('/register', (req, res) => {
    res.status(204)
    res.end()
})


app.use(bodyParser.json())
app.use('/mellon-dev', router)
app.use((req, res, next) => {
    console.log(req)
    let err = new Error("Boho")
    err.status = 404
    next(err)
})
app.listen(9900)

