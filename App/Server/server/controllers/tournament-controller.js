const Player = require('../data/Player')
const Tournament = require('../data/Tournament')
const Category = require('../data/Category')
const tournamentService = require('../services/tournamentService')
const categoryService = require('../services/categoryService')

let tournamentGenerator =
    (officialName, city, country, surface, startDate, endDate, prizeMoney, website, category) => {
        return {
            officialName: officialName,
            city: city,
            country: country,
            surface: surface,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            prizeMoney: prizeMoney,
            website: website,
            category: category
        }
    }

module.exports = {
    createGet: (req, res) => {

        categoryService.getAll().then(categories => {
            return res.status(200).json({
                success: true,
                categories

            })
        }).catch((err) => {
            return res.status(400).json({
                success: false,
                error: err
            })
        })
    },

    createPost: (req, res) => {
        let tournament = req.body;

        console.log(tournament);

        let tournamentObj = tournamentGenerator(
            tournament.officialName,
            tournament.city,
            tournament.country,
            tournament.surface,
            tournament.startDate,
            tournament.endDate,
            tournament.prizeMoney,
            tournament.website,
            tournament.category,
        )

        console.log(tournamentObj);


        tournamentService.create(tournamentObj)
            .then((response) => {
                return res.status(200).json({
                    success: true,
                    response
                })
            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            })
    },

    getAll: (req, res) => {
        tournamentService.getAllPopulate()
            .then(tournaments => {
                return res.status(200).json({
                    success: true,
                    tournaments
                })
            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            })

    },

    deleteGet: (req, res) => {
        // let id = req.body.id
        let tournamentId = req.params.id

        tournamentService.getById(tournamentId)
            .then(tournament => {
                return res.status(200).json({
                    success: true,
                    tournament
                })
            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            })
    },

    deletePost: (req, res) => {
        let tournamentId = req.params.id

        tournamentService.delete(tournamentId)
        .then(tournament => {
            return res.status(200).json({
                success: true,
                tournament
            })
        }).catch((err) => {
            return res.status(400).json({
                success: false,
                error: err
            })
        })

        // tournamentService.getById(tournamentId)
        //     .then(tournament => {
        //         tournament.remove()
        //             .then(tournament => {
        //                 return res.status(200).json({
        //                     success: true,
        //                     tournament
        //                 })
        //             }).catch((err) => {
        //                 return res.status(400).json({
        //                     success: false,
        //                     error: err
        //                 })
        //             })
        //     }).catch((err) => {
        //         return res.status(400).json({
        //             success: false,
        //             error: err
        //         })
        //     })

    }
}