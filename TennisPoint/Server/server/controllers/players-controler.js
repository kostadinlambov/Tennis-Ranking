const Player = require('../data/Player')
const playerService = require('../services/playerService')
const tournamentService = require('../services/tournamentService')
const mongoose = require('mongoose')

let playerGenerator =
    (firstName, lastName, country, age, birthplace, birthdate, earnings, weight, height, residence, imageUrl, points) => {
        return {
            firstName: firstName,
            lastName: lastName,
            country: country,
            age: age,
            birthplace: birthplace,
            birthdate: new Date(birthdate),
            earnings: earnings,
            weight: weight,
            height: height,
            residence: residence,
            imageUrl: imageUrl,
            points: points
        }
    }

module.exports = {

    getById: (req, res) => {
        let playerId = req.params.id
        playerService.getById(playerId)
            .then((player) => {
                tournamentService.getAll()
                    .then(tournaments => {

                        let playerTournaments = [];
                        for (currentPlayerTournament of player.tournaments) {
                            console.log(currentPlayerTournament)
                            let currentPlayerTournamentId = mongoose.Types.ObjectId(currentPlayerTournament['tournament']['id']).toString();
                            
                            for(tournament of tournaments){
                                let currentTournamentId = mongoose.Types.ObjectId(tournament['id']).toString(); 
                                if(currentPlayerTournamentId === currentTournamentId){
                                    playerTournaments.push(tournament)
                                }
                            }
                        }
        
                        return res.status(200).json({
                            success: true,
                            message: 'Loaded current player with his tournaments.',
                            player,
                            playerTournaments
                        })
                     
                    }).catch((err) => {
                        return res.status(400).json({
                            success: false,
                            error: err
                        })
                    })

            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    message: err,
                    error: err
                })
            })
    },

    createPost: (req, res) => {
        let player = req.body;

        console.log(player);

        let playerObj = playerGenerator(
            player.firstName,
            player.lastName,
            player.country,
            player.age,
            player.birthplace,
            player.birthdate,
            // player._id,
            player.earnings,
            player.weight,
            player.height,
            player.residence,
            player.imageUrl,
            player.points
        )

        console.log(playerObj);

        playerService.create(playerObj)
            .then((response) => {
                return res.status(200).json({
                    success: true,
                    response
                })
            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid data',
                    error: err
                })
            })
    },

    getAll: (req, res) => {
        playerService.getAll()
            .then(players => {
                return res.status(200).json({
                    success: true,
                    message: 'All Players',
                    players
                })
            })
    },

    getAllPopulate: (req, res) => {
        const modelPropertyNameToPopulate = 'tournaments'
        playerService.getAllPopulate(modelPropertyNameToPopulate)
            .then(players => {
                return res.status(200).json({
                    success: true,
                    message: 'All Players',
                    players
                })
            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            })
    },

    getAddTournament: (req, res) => {
        const modelPropertyNameToPopulate = 'category'
        playerService.getAll()
            .then(players => {
                tournamentService.getAllPopulate(modelPropertyNameToPopulate)
                    .then(tournaments => {
                        return res.status(200).json({
                            success: true,
                            players,
                            tournaments
                        })
                    }).catch((err) => {
                        return res.status(400).json({
                            success: false,
                            error: err
                        })
                    })
            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    error: err
                })

            })
    },

    postAddTournament: (req, res) => {
        let bodyParams = req.body;
        console.log(bodyParams);

        const playerId = bodyParams['playerId']
        const tournamentId = bodyParams['tournament']
        const round = bodyParams['round']
        const points = bodyParams['points']

        const updateObj = {
            'tournament': tournamentId,
            'round': round,
            'points': points
        }

        playerService.getById(playerId)
            .then(player => {

                let hasTournament = false

                for (currentTournament of player.tournaments) {

                    let currentTournamentId = mongoose.Types.ObjectId(currentTournament['tournament']['id']).toString();

                    if (currentTournamentId === tournamentId) {

                        player.points -= currentTournament['points']
                        currentTournament['points'] = Number(points)
                        currentTournament['round'] = round

                        player.points += currentTournament['points']
                        hasTournament = true
                        player.save()

                        return res.status(200).json({
                            success: true,
                            player
                        })
                    }
                }

                if (!hasTournament) {
                    player.points += Number(points)
                    player.tournaments.push(updateObj)
                    console.log(player)
                    player.save()

                    tournamentService.getById(tournamentId)
                        .then(tournament => {
                            tournament.players.push(playerId)

                            console.log(tournament);
                            tournament.save();

                            return res.status(200).json({
                                success: true,
                                player
                            })

                        }).catch((err) => {
                            return res.status(400).json({
                                success: false,
                                error: err
                            })

                        })
                }
            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    error: err
                })

            })
    },

    getDeleteTournament: (req, res) => {
        const modelPropertyNameToPopulate = 'category'
        playerService.getAll()
            .then(players => {
                tournamentService.getAllPopulate(modelPropertyNameToPopulate)
                    .then(tournaments => {
                        return res.status(200).json({
                            success: true,
                            players,
                            tournaments
                        })
                    }).catch((err) => {
                        return res.status(400).json({
                            success: false,
                            error: err
                        })
                    })
            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    error: err
                })

            })
    },

    postDeleteTournament: (req, res) => {
        let bodyParams = req.body;
        console.log(bodyParams);

        const playerId = bodyParams['playerId']
        const tournamentId = bodyParams['tournament']

        playerService.getById(playerId)
            .then(player => {
                if (player.tournaments.length === 0) {
                    return res.status(400).json({
                        success: false,
                        error: 'Player is not registered for any tournament.'
                    })
                }
                for (currentTournament of player.tournaments) {
                    let currentTournamentId = mongoose.Types.ObjectId(currentTournament['tournament']['id']).toString();

                    if (currentTournamentId === tournamentId) {

                        player.points -= currentTournament['points']
                        player.tournaments = player.tournaments.filter(x => mongoose.Types.ObjectId(x['tournament']['id']).toString() !== tournamentId)

                        console.log(player.tournaments)
                        player.save()

                        return res.status(200).json({
                            success: true,
                            player
                        })
                    }
                }

                return res.status(400).json({
                    success: false,
                    error: 'Player is not registered for that tournament.'
                })

            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    error: err
                })

            })
    },
    editPost: (req, res) => {
       
        let player = req.body;
        let playerId = req.params.id

        // console.log(tournament);
        // console.log(tournament.imageUrl)
        // let url = tournament.imageUrl

        let playerObj = playerGenerator(
            player.firstName,
            player.lastName,
            player.country,
            player.age,
            player.birthplace,
            player.birthdate,
            // player._id,
            player.earnings,
            player.weight,
            player.height,
            player.residence,
            player.imageUrl,
            player.points
        )

        console.log(playerObj);

        Tounament.findByIdAndUpdate(tournamentId,{$set:playerObj}, function(err, result){
            if(err){
                return res.status(400).json({
                    success: false,
                    message: 'Player update failed',
                    error: err
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Player updated',
                result
            })
        });
    },

    deletePost: (req, res) => {
        let playerId = req.params.id

        playerService.delete(playerId)
            .then(player => {
                return res.status(200).json({
                    success: true,
                    message: 'Player deleted successfully!',
                    player
                })
            }).catch((err) => {
                return res.status(400).json({
                    success: false,
                    message: 'Player deleting error!',
                    error: err
                })
            })
    },

}