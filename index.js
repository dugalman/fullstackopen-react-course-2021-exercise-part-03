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
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            (person)
                ? res.json(person)
                : res.json({ code: 'Not Found' }).status(404).end()
        })
        .catch(error => {
            console.log("WAT IS THIS", error)
            next(error)
        })

})


/////////////////////////////////////////////////
app.post('/api/persons', (req, res, next) => {

    const body = req.body;

    const person = new Person({
        name: body.name,
        number: body.number || false
    })

    person
        .save()
        .then(savedPerson => savedPerson.toJSON())
        .then(data => res.json(data))
        .catch(e => next(e))

})

/////////////////////////////////////////////////
// app.post('/api/persons', (req, res) => {

//     const newPerson = req.body;

//     if (!newPerson.name) { return res.status(404).json({ error: `The 'name' field is required` }) }

//     if (newPerson.name.trim().length === 0) {
//         return res.status(404).json({ error: `The 'name' field must be not empty` })
//     }

//     const query = Person.find({ name: newPerson.name });
//     query.count((err, count) => {
//         if (err || count > 0) {
//             return res.status(404).json({ error: `name must be unique` })
//         } else {
//             const out = Person.create(newPerson);
//             res.json(out).status(200);
//         }
//     })

// })



/////////////////////////////////////////////////
app.put('/api/persons', (req, res) => {

    const newPerson = req.body;

    if (!newPerson.name) { return res.status(404).json({ error: `The 'name' field is required` }) }

    if (newPerson.name.trim().length === 0) {
        return res.status(404).json({ error: `The 'name' field must be not empty` })
    }

    const query = { name: newPerson.name };
    Person.findOneAndUpdate(
        query,
        { $set: { name: newPerson.name, number: newPerson.number } },
        (err, docs) => {
            if (err) {
                console.log(err)
                return res.status(404).json({ error: `Error updating Docs`, err })
            }
            else {
                console.log("Updated Docs : ", newPerson);
                return res.json(newPerson).status(200);
            }
        }
    );
    // query.count((err, count) => {
    //     if (count === 1) {
    //         const out = Person.updateOne( { name: newPerson.name }, {number:number }   )
    //         res.json(out).status(200);
    //     } else {
    //         return res.status(404).json({ error: `Not Found name`, err })            
    //     }
})



/////////////////////////////////////////////////
app.delete('/api/persons/:id', (req, res, next) => {

    Person.findByIdAndRemove(req.params.id)
        .then(result => { res.status(204).end() })
        .catch(error => next(error))

})


///////////////////////////////////////////////////////////////////////// 
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

////////////////////////////////////////////////////////////////////////
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)


//////////////////MAIN//////////////////
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})