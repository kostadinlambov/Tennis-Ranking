const Player = require('../data/Player');

const crud = require('../infrastructure/mongooseCrud');
const players = crud(Player);

module.exports = {
    create: player =>
        new Promise((resolve, reject) => {
            players
                .create(player)
                .then(createdPlayer => resolve(createdPlayer))
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        }),
    getById: id =>
        players.get(id),
    getAll: () =>
        players.getAll(),
    delete: id => {
        tournaments.delete(id)
    }

};