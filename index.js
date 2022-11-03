const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const numberOfPeople = Number(persons.length)
    const time = Date()
    response.send(`<p>Phonebook has info for ${numberOfPeople} people</p> <p>${time}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const exists = persons.find(person => person.name === body.name)
    if ((!body.name) || (!body.number)) {
        return response.status(404).json({
            error: 'content missing'
        })
    }
    if (exists) {
        return response.status(404).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: (Math.random() * 50),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
