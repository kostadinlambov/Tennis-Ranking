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
    getAllPopulate: (modelPropertyNameToPopulate) => {
        return players.getAllPopulate(modelPropertyNameToPopulate)
    },
    delete: id => {
        players.delete(id)
    },
    findByIdAndUpdate: (id, data) => {
        return players.findByIdAndUpdate(id, data)
    }

};