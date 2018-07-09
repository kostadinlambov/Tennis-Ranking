const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const playerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true },
    birthdate: { type: Date, required: true },
    // age: {type: Number, required: true},
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    birthplace: { type: String, required: true },
    residence: { type: String, required: true },
    // coach: {type: ObjectId, ref: 'Coach', required: true},
    earnings: { type: Number, required: false, default: 0 },
    imageUrl: { type: String, required: true },
    tournaments: [{tournament:{ type: ObjectId, ref: 'Tournament', default: [] }, round: {type: String, requred: true}, points:{type: Number, default: 0} }],
    // tournaments: [{ type: ObjectId, ref: 'Tournament', default: [] }],
    points: { type: Number, default: 0 }
}, { usePushEach: true })


const Player = mongoose.model('Player', playerSchema)

module.exports = Player