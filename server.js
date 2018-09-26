const express = require('express')
const app = express()
const config = require('./appconfig')
const bodyParser = require('body-parser')
const EventEmitter = require('events');

class EventBarrier extends EventEmitter {}

const eventBarrier = new EventBarrier()

let router = express.Router()

function noopTimer() {
    return setTimeout(() => {
        eventBarrier.emit('command', 'noop')
    }, 5000)
}

var t = noopTimer()

const queue = []

eventBarrier.on('submit', (cmd) => {
    queue.push(cmd)
    clearTimeout(t)
    eventBarrier.emit('command', cmd)
})

eventBarrier.on('command', (cmd) => {
    console.log('Hej hej', cmd)
    if(cmd != 'noop') {
        clearTimeout(t)
    }
    t = noopTimer()
})

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

router.post('/event', (req, res) => {
    console.log(req.body)
    res.status(204)
    res.end()
})

router.get('/commands', (req, res) => {
    console.log(req.headers)
    const command = queue.pop()
    if(command) {
        res.status(200)
        res.send({command: command})
        res.end()
    } else {
        eventBarrier.once('command', (cmd) => {
            queue.pop()
            res.status(200)
            res.send({command: cmd})
            res.end()
        })
    }
})

router.post('/commands', (req, res) => {
    console.log(req.body)
    eventBarrier.emit('submit', req.body.command)
    res.status(201)
    res.end()
})


app.use(bodyParser.json())
app.use('/', router)
app.use((req, res, next) => {
    console.log(req)
    let err = new Error("0xBADBEEF")
    err.status = 404
    next(err)
})
app.listen(9120)

