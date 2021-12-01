require('dotenv').config();
const Person = require('./models/person')

const express = require('express')
const morgan = require('morgan')
// const fs = require('fs')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.static('build'))

///////////////////////////////////////////////////////////////////////////////
// setup the logger

const morgaLine = ':method :url :status - :res[content-length] - :response-time ms :body ';
morgan.token('body', function (req, res) { return JSON.stringify(req.body); });
// app.use(morgan(morgaLine, {stream: fs.createWriteStream('./log/access.log', {flags: 'a'})}));
app.use(morgan(morgaLine));

// los request los interpreta como integer
app.use(express.json())

/////////////////////////////////////////////////
app.get('/api/info', (req, res) => {

    var query = Person.find();

    query.count((err, count) => {
        if (err) {
            return res.status(404).json({ error: `Something is wrong`, code: err })
        }
        else {
            const requestTime = new Date()
            const template = `<p>Phonebook has info for ${count} people</p><p>${requestTime}</p>`
            res.set('Content-Type', 'text/html');
            res.send(Buffer.from(template));
        }
    });
})

/////////////////////////////////////////////////
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

/////////////////////////////////////////////////
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(persons => {
        res.json(persons)
    })
})


/////////////////////////////////////////////////
app.post('/api/persons', (req, res) => {

    const newPerson = req.body;

    if (!newPerson.name) { return res.status(404).json({ error: `The 'name' field is required` }) }

    if (newPerson.name.trim().length === 0) {
        return res.status(404).json({ error: `The 'name' field must be not empty` })
    }

    const query = Person.find({ name: newPerson.name });
    query.count((err, count) => {
        if (err || count > 0) {
            return res.status(404).json({ error: `name must be unique` })
        }else{
            const out = Person.create(newPerson);
            res.json(out).status(200);
        }
    })

    
})


/////////////////////////////////////////////////
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    // para borrar copia todo menos el que llega por id
    const newPersons = persons.filter(person => person.id !== id)
    res.status(204).end()
})






//////////////////MAIN//////////////////
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})