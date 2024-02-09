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
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /^([0-9]{3}|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(v)
      },
      message: 'Phone number must be in one of the following formats: 09-1234556 or 040-22334455'
    }
  }
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
