const mongoose = require('mongoose')
const { Schema } = mongoose

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedPerson) => {
    returnedPerson.id = returnedPerson._id.toString()
    delete returnedPerson._id
    delete returnedPerson._v
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
