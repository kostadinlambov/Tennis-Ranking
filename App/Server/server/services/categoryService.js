const Category = require('../data/Category');

const crud = require('../infrastructure/mongooseCrud');
const categories = crud(Category);

module.exports = {
    create: category =>
        new Promise((resolve, reject) => {
            categories
                .create(category)
                .then(createdCategory => resolve(createdCategory))
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        }),
    get: id =>
        categories.get(id),
    getAll: () =>
        categories.getAll(),
    // delete: id => 
    //     new Promise((resolve, reject) => {
    //         genres
    //             .get(id)
    //             .then(existingGenre => {
    //                 if (existingGenre.memes.length > 0) {
    //                     var message = `Cannot delete genre with id "${id}". It contains memes.`;
    //                     console.log(message);
    //                     reject(message);
    //                     return;
    //                 }

    //                 genres
    //                     .delete(id)
    //                     .then(() => resolve())
    //                     .catch(err => {
    //                         console.log(err);
    //                         reject(err);
    //                     });
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 reject(err);
    //             });
    //     })
};