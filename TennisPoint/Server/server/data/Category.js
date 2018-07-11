const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


//categories: [Grand Slam, ATP1000, ATP500, ATP250] - coming from Tournament-Form from FrontEnd as String

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    winnerPoints: { type: Number, required: true },
    firstRoundPoints: { type: Number, required: true },
    secondRoundPoints: { type: Number, required: true },
    thirdRoundPoints: { type: Number, required: true },
    fourthRoundPoints: { type: Number, required: true },
    fifthRoundPoints: { type: Number, required: true },
    sixthRoundPoints: { type: Number, required: false },
    seventhRoundPoints: { type: Number, required: false },
    eighthRoundPoints: { type: Number, required: false },
}, { usePushEach: true })

const Category = mongoose.model('Category', categorySchema)

module.exports = Category