const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const coachSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true, unique: true},
    country: {type: String, required: true},
    age: {type: Number, required: true},
    bithplace: {type: String, required: true},
    players: [{type: ObjectId, ref: 'Player', default: []}]
}, { usePushEach: true })

const Coach = mongoose.model('Coach', coachSchema)

module.exports = Coach