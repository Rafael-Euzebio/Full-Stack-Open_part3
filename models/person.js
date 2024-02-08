require('dotenv').config()
const mongoose = require('mongoose')
const { Schema } = mongoose

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB')
  }).catch(error => {
    console.log('Error connecting to MongoDB', error.message)
  })

const personSchema = new Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedPerson) => {
    returnedPerson.id = returnedPerson._id.toString()
    delete returnedPerson._id
    delete returnedPerson.__v
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
