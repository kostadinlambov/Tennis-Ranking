const tournamentService = require('../services/tournamentService')
const categoryService = require('../services/categoryService')
const playerService = require('../services/playerService')
const Tounament = require('../data/Tournament');


let tournamentGenerator =
    (officialName, city, country, surface, startDate, endDate, prizeMoney, website, category, imageUrl) => {
        return {
            officialName: officialName,
            city: city,
            country: country,
            surface: surface,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            prizeMoney: prizeMoney,
            website: website,
            category: category,
            imageUrl: imageUrl
        }
    }

module.exports = {
    getById: (req, res) => {
        let tournamentId = req.params.id
        tournamentService.getById(tournamentId)
            .then((tournament) => {

                playerService.getAll()
                    .then(players => {

                        let tournamentPlayers = [];
                        for (currentPlayerTournament of tournament.players) {
                            console.log(currentPlayerTournament)
                            console.log(currentPlayerTournament.toString())
                            let currentPlayerTournamentId = currentPlayerTournament.toString()
                            for (player of players) {
                                console.log(player)
                                console.log(player.id)
                                let currentPlayerId = player['id'];
                                if (currentPlayerTournamentId === currentPlayerId) {
                                    tournamentPlayers.push(player)
                                }
                            }
                        }

                        return res.status(200).json({
                            success: true,
                            message: 'Loaded current tournament with his players.',
                            tournament,
                            tournamentPlayers
                        })

                    }).catch((err) => {
                        return res.status(400).json({
                            success: false,
                            message: 'Failed to load current tournament with his players.',
                            error: err
                        })
                    })
            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    message: 'Failed to load current tournament with his players.',
                    error: err
                })
            })
    },

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
        console.log(tournament.imageUrl)
        console.log(tournament.imageUrl)
        let url = tournament.imageUrl

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
            url
        )

        // let tournamentObj ={
        //     officialName: officialName,
        //     city: city,
        //     country: country,
        //     surface: surface,
        //     startDate: new Date(startDate),
        //     endDate: new Date(endDate),
        //     prizeMoney: prizeMoney,
        //     website: website,
        //     category: category,
        //     imageUrl: imageUrl
        // }

        console.log(tournamentObj);


        tournamentService.create(tournamentObj)
            .then((response) => {
                return res.status(200).json({
                    success: true,
                    message: 'Tournament created',
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
        tournamentService.getAll()
            .then(tournaments => {
                return res.status(200).json({
                    success: true,
                    message: 'Loaded all tournaments',
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
                    message: 'Tournament deleted successfully!',
                    tournament
                })
            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    message: 'Tournament deleting error!',
                    error: err
                })
            })
    },


    editPost: (req, res) => {
       
        let tournament = req.body;
        let tournamentId = req.params.id

        console.log(tournament);
        console.log(tournament.imageUrl)
        let url = tournament.imageUrl

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
            url
        )

        console.log(tournamentObj);

        Tounament.findByIdAndUpdate(tournamentId,{$set:tournamentObj}, function(err, result){
            if(err){
                return res.status(400).json({
                    success: false,
                    message: 'Tournament update failed',
                    error: err
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Tournament updated',
                result
            })
        });

    //    tournamentService.findByIdAndUpdate(tournamentId, tournamentObj)
    //    .then((response) => {
    //             return res.status(200).json({
    //                 success: true,
    //                 message: 'Tournament updated',
    //                 response
    //             })
    //         }).catch((err) => {
    //             return res.status(400).json({
    //                 success: false,
    //                 message: 'Tournament update failed',
    //                 error: err
    //             })
    //         })

    }

}
