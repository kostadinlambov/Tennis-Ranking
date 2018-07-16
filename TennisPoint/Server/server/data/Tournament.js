const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const tounamentSchema = new mongoose.Schema({
    officialName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    surface: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    prizeMoney: { type: Number, required: true },
    website: { type: String, required: true },
    players: [{ type: ObjectId, ref: 'Player', default: [] }],
    imageUrl: { type: String, required: true },
    // category: {type: String, required: true}, //categories: [Grand Slam, ATP1000, ATP500, ATP250] - coming from  Tournament-Form from FrontEnd as String
    // category: { type: ObjectId, ref: 'Category', required: false }
    category: { type: String, required: true  }
}, { usePushEach: true })

const Tournament = mongoose.model('Tournament', tounamentSchema)

module.exports = Tournament

// new Date('01.02.2012')
// Mon Jan 02 2012 00:00:00 GMT+0100 (CET)