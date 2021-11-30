/**
 * @use $ node mongo.js password name cellfone,
 */

const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.sdlbf.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const firstName = process.argv[3] || 'quien';
const cellphone = process.argv[4] || 555;

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

///////////////////////////////////////////////////////////////
if (process.argv.length === 3) //solo mandaron la contraseña
{
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: firstName,
        number: cellphone
    })

    person.save().then(result => {
        console.log(`added ${firstName} ${cellphone} to phonebook!`)
        mongoose.connection.close()
    })

}


