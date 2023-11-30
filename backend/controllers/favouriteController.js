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
    const movieId = req.body.movie_id
    const seriesId = req.body.series_id
    try {
        const typeResult = await favourites.movieOrSeries(movieId, seriesId)
        if(typeResult) {
            const checkResult = await favourites.checkIfFavouriteExists(idUsers, idGroups, movieId, seriesId)
            if (checkResult.rowCount > 0) {
                throw new Error('Allready in favourites')
            }
        }
        await favourites.addToFavourites(idUsers, idGroups, favouritesData);
        res.status(201).json({ message: 'Added to favourites successfully' });
        
    } catch (error) {
        next(error);
    }
};

const getFavouritesFrom = async (req, res, next) => {
    const idUsers = res.locals.userId;
    let idGroups = req.query.id_groups;
    try {
        if(idGroups === undefined) {
            idGroups = ''
        }
        const results = await favourites.getFavourites(idUsers, idGroups)
        if(results.rowCount === 0) {
            throw new Error('No favourites found. Check if user has favourites or id is correct.')
        }
        res.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
};

const deleteFavourite = async (req, res, next) => {
    const idUsers = res.locals.userId;
    let idGroups = req.query.id_groups;
    const name = req.query.name;
    let results 
    try {
        if (name === undefined || name === '') {
            throw new Error('Name not specified')
        } else if (idGroups === undefined) {
            idGroups = ''
        }
        results = await favourites.deleteFavourite(idUsers, idGroups, name)
        if(results.rowCount === 0) {
            throw new Error('Nothing to delete')
        } else {
            res.status(200).json('Delete success');
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
