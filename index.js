const express = require('express')
const app = express()

// los request los interpreta como integer
app.use(express.json())


let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dam Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
    {
        id: 5,
        name: "Damian Mac Dougall",
        number: "555-123456"
    },
]

/////////////////////////////////////////////////
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

/////////////////////////////////////////////////
app.get('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        return res.json(person)
    }

    res.status(404).end()
})


/////////////////////////////////////////////////
app.post('/api/persons', (req, res) => {
    const id = Math.floor(Math.random() * 10000) + 5

    const newPerson = req.body;
    newPerson.id = id
    console.log(newPerson)

    res.json(newPerson).status(200);


})


/////////////////////////////////////////////////
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    // para borrar copia todo menos el que llega por id
    const newPersons = persons.filter(person => person.id !== id)
    res.status(204).end()
})



/////////////////////////////////////////////////
app.get('/api/info', (req, res) => {
    const countPerson = persons.length
    const requestTime = new Date()

    // console.log(JSON.stringify(req.headers));

    let template = `<p>Phonebook has info for ${countPerson} people</p>
    <p>${requestTime}</p>
    `
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(template));

})


//////////////////MAIN//////////////////
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})