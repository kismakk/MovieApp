const favourites = require('../models/favouriteModel.js');

const getAllFavourites = async (req, res, next) => {
    try {
        const result = await favourites.getAllFavourites();
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
};

const addToFavourites = async (req, res, next) => {
    let idUsers = res.locals.userId;
    const idGroups = req.body.id_groups;
    const favouritesData = req.body;
    console.log(idGroups)
    //Siirrä logiikka controlleriin
    try {
        if(idGroups !== '' && idGroups !== undefined) {
            idUsers = ''
            await favourites.movieOrSeries()
            const results = await favourites.addToFavourites(idUsers, idGroups, favouritesData);
        } else if (idUsers !== '' && idUsers !== undefined) {
            console.log('Lisätään useriin')
        } else {
            throw new Error ('Failed to add to favourites')
        }
    /*     await favourites.addToFavourites(idUsers, idGroups, favouritesData);
        res.status(201).json({ message: 'Added to favourites successfully' }); */
    } catch (error) {
        next(error);
    }
};

const getFavouritesFrom = async (req, res, next) => {
    const idUsers = res.locals.userId;
    const idGroups = req.query.id_groups;
    console.log(idGroups)
    try {
        if(idGroups !== undefined && idGroups !== '') {
        const results = await favourites.getFavourites('group', idGroups)
        res.status(200).json({results});
        } else if (idUsers !== undefined && idUsers !== '') {
        const results = await favourites.getFavourites('user', idUsers)
        res.status(200).json({results});
        } else {
            throw new Error('No users or group defined')
        }
    } catch (error) {
        next(error);
    }
};

const deleteFavourite = async (req, res, next) => {
    const idUsers = res.locals.userId;
    const idGroups = req.query.id_groups;
    const name = req.query.name;
    try {
        if (name === undefined || name === '') {
            throw new Error('Name not specified')
        } else if(idGroups === '' || idGroups === undefined) {
            const results = await favourites.deleteFavourite('user', idUsers, name)
            if(!results) {
                throw new Error('Failed to delete')
            } else if(results.rowCount === 0) {
                throw new Error('Nothing to delete')
            } else {
                res.status(200).json('Delete success');
            }

        } else {
            const results = await favourites.deleteFavourite('group', idGroups, name)
            if(!results) {
                throw new Error('Failed to delete')
            } else if(results.rowCount === 0) {
                throw new Error('Nothing to delete')
            } else {
                res.status(200).json('Delete success');
            }
        } 
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllFavourites,
    getFavouritesFrom,
    addToFavourites,
    deleteFavourite,
};
