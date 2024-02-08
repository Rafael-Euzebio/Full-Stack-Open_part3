const mongoose = require('mongoose')
const { Schema } = mongoose

const password = process.argv[2]
const url = `mongodb+srv://Full-Stack-Open:${password}@full-stack-open.02nlei5.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

const personSchema = new Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

const addPerson = (newName, newNumber) => {
  mongoose.connect(url)

  const person = new Person({
    name: newName,
    number: newNumber
  })

  person.save().then((result) => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
}

const showEntries = () => {
  mongoose.connect(url)
  Person.find({}).then((persons) => {
    console.log(persons)
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const newName = process.argv[3]
  const newNumber = process.argv[4]
  addPerson(newName, newNumber)
} else if (process.argv.length === 3) {
  showEntries()
} else {
  console.log('View entries: node mongo.js [password]')
  console.log('Add entry: node mongo.js [password] [name] [number]')
  process.exit(1)
}
