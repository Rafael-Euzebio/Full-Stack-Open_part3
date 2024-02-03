const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

const generateId = (number) => {
  if (persons.length > 0) {
    const max = Math.floor(number)
    const min = Math.ceil(Math.max(...persons.map(person => person.id)) + 1)

    const id = Math.floor(Math.random() * (max - min) + min)
    return id
  }

  return 0
}
app.get('/api/persons', (req, res) => {
  res.json(persons).status(200).end()
})

app.get('/info', (req, res) => {
  const entries = persons.length
  const currentDate = new Date().toLocaleDateString('en-gb',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }
  )

  res.send(`<p>Phonebook has info for ${entries} people<p/>
    <br/>
    ${currentDate}
    `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  const person = persons.find((person) => {
    return person.id === id
  })

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((person) => {
    return person.id === id
  })

  if (person) {
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({
      error: 'content missing'
    })
  } else if (persons.find((person) => person.name === name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const id = generateId(Number(number))
  res.json({
    id,
    name,
    number
  }).status(201).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
