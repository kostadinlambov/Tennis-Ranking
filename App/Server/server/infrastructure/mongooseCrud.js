module.exports = (Model) => {
    const modelName = Model.modelName;

    return {
        create: modelData =>
            new Promise((resolve, reject) => {
                let entity = new Model(modelData);
                entity
                    .save()
                    .then(() => {
                        return resolve(entity);
                    })
                    .catch(err => {
                        console.log(err);
                        return  reject(err);
                    });
            }),
        get: id =>
            new Promise((resolve, reject) => {
                Model.findById(id).then(existingEntity => {
                    if (!existingEntity) {
                        let message = `${modelName} with id: ${id} does not exist.`;
                        console.log(message);
                        return reject(message);
                    }

                    return resolve(existingEntity);
                });
            }),
        getAll: () =>
            new Promise((resolve) => {
                Model.find().then(entities => {
                    return resolve(entities);
                });
            }),
        delete: id =>
            new Promise((resolve, reject) => {
                Model.findById(id).then(existingEntity => {
                    if (!existingEntity) {
                        let message = `${modelName} with id: ${id} does not exist`;
                        console.log(message);
                        reject(message);
                        return;
                    }

                    return existingEntity.remove()
                        .then((res) => {
                            return resolve(res);
                        })
                        .catch(err => {
                            console.log(err);
                            return reject(err);
                        });;
                });
            }),



        getAllPopulate: (modelPropertyNameToPopulate) =>
            new Promise((resolve) => {
                Model.find().populate(modelPropertyNameToPopulate)
                    .then(entities => {
                        // Model.find().populate('category').then(entities => {
                        return resolve(entities);
                    }).catch(err => {
                        console.log(err);
                        return reject(err);
                    });
            }),
    };
};