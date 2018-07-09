const Tounament = require('../data/Tournament');

const crud = require('../infrastructure/mongooseCrud');
const tournaments = crud(Tounament);

module.exports = {
    create: tournament =>
        new Promise((resolve, reject) => {
            tournaments
                .create(tournament)
                .then(createdTounament => resolve(createdTounament))
                .catch(err => {
                    console.log(err);
                    return  reject(err);
                });
        }),
    getById: id =>
        tournaments.get(id),
    getAll: () =>
        tournaments.getAll(),
    getAllPopulate: (modelPropertyNameToPopulate) =>{
        return  tournaments.getAllPopulate(modelPropertyNameToPopulate)
    },
       
    delete: id => {
        return tournaments.delete(id)
    }
     
};