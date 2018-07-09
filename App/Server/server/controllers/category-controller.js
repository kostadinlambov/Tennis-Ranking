const Category = require('../data/Category')
const categoryService = require('../services/categoryService')


let categoryGenerator =
    (categoryName, winnerPoints, firstRoundPoints, secondRoundPoints, thirdRoundPoints,fourthRoundPoints, fifthRoundPoints, sixthRoundPoints, seventhRoundPoints, eighthRoundPoints) => {
        return {
            categoryName: categoryName,
            winnerPoints: winnerPoints,
            firstRoundPoints: firstRoundPoints,
            secondRoundPoints: secondRoundPoints,
            thirdRoundPoints: thirdRoundPoints,
            fourthRoundPoints: fourthRoundPoints,
            fifthRoundPoints: fifthRoundPoints,
            sixthRoundPoints: sixthRoundPoints,
            seventhRoundPoints: seventhRoundPoints,
            eighthRoundPoints: eighthRoundPoints
        }
    }

module.exports = {
    createPost: (req, res) => {
        let category = req.body;

        console.log(category);

        let categoryObj = categoryGenerator(
            category.categoryName,
            category.winnerPoints,
            category.firstRoundPoints,
            category.secondRoundPoints,
            category.thirdRoundPoints,
            category.fourthRoundPoints,
            category.fifthRoundPoints,
            category.sixthRoundPoints,
            category.seventhRoundPoints,
            category.eighthRoundPoints,
           
        )

        console.log(categoryObj);


        categoryService.create(categoryObj)
            .then((response) => {
                return res.status(200).json({
                    success: true,
                    response
                })
            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    // error: 'Invalid user data'
                    error: err
                })
            })
    },

    getAll: (req, res) => {
        categoryService.getAll()
            .then(players => {
                res.status(200).json({
                    success: true,
                    players
                })
            })

    }
}