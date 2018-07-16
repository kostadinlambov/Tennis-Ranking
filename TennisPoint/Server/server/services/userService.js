const User = require('../data/User');

const crud = require('../infrastructure/mongooseCrud');
const users = crud(User);

module.exports = {
    // create: player =>
    //     new Promise((resolve, reject) => {
    //         players
    //             .create(player)
    //             .then(createdPlayer => resolve(createdPlayer))
    //             .catch(err => {
    //                 console.log(err);
    //                 reject(err);
    //             });
    //     }),
    // getById: id =>
    //     players.get(id),
    // getAll: () =>
    //     players.getAll(),
    // delete: id => {
    //     tournaments.delete(id)
    // },
    getByEmail: email => {
        new Promise((resolve, reject) => {
            User.find({ 'email': email })
                .then(entities => {
                    return resolve(entities);
                }).catch(err => {
                    console.log(err);
                    return reject(err);
                });
            
        })
    }
};