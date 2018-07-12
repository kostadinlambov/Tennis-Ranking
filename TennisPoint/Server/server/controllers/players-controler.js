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

        // let dateAsString = Date(playerObj.birthdate)
        // console.log('dateAsString: ');
        // console.log(dateAsString);
        // console.log(playerObj.birthdate.toDateString());
        // console.log(playerObj.birthdate.toString());


        // // Date d = (Date) dateAsString;
        //  dateAsString.getTime();
        //  console.log( dateAsString.getTime());
        //  console.log( dateAsString.getAll());

        playerService.create(playerObj)
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
        playerService.getAll()
            .then(players => {
                return res.status(200).json({
                    success: true,
                    message: 'All categories',
                    players
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
}