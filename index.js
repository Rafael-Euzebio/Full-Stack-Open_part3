const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/api/persons', (req, res) => {
  res.json(persons).status(200).end()
})

app.get('/info', (req, res) => {
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

  res.send(`${currentDate}`)
})

app.get('/api/persons/:id', (req, res) => {
  res.status(202).end()
})

app.delete('/api/persons/:id', (req, res) => {
  res.status(202)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
