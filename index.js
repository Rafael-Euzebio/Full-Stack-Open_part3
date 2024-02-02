const express = require('express')
const app = express()

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

  console.log(currentDate)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})