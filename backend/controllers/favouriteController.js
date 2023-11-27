const favourites = require('../models/favouriteModel.js');

const getAllFavourites = async (req, res) => {
    try {
        const result = await favourites.getAllFavourites();
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const addToFavourites = async (req, res) => {
    const favouritesData = req.body;
    try {
        await favourites.addToFavourites(favouritesData);
        res.status(200).json({ message: 'Added to favourites successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getFavouritesFrom = async (req, res) => {
    const idUsers = req.query.id_users;
    const idGroups = req.query.id_groups;
    try {
        if(idUsers !== undefined && idUsers !== '') {
        const results = await favourites.getFavourites('user', idUsers)
        res.status(200).json({results});
        } else if (idGroups !== undefined && idGroups !== '') {
        const results = await favourites.getFavourites('group', idGroups)
        res.status(200).json({results});
        } else {
            throw new Error('No users or group defined')
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const deleteFavourite = async (req, res) => {
    const idUsers = req.query.id_users;
    const idGroups = req.query.id_groups;
    const name = req.query.name;
    try {
        if (idUsers !== undefined && idGroups !== undefined) {
            throw new Error('Trying to delete from user and group at the same time')

        } else if(idUsers !== undefined && idUsers !== '' && name !== undefined && name !== '') {
            const results = await favourites.deleteFavourite('user', idUsers, name)
            if(!results) {
                throw new Error('Failed to delete')
            } else if(results.rowCount === 0) {
                throw new Error('Nothing to delete')
            }
            res.status(200).json('Delete success');

        } else if (idGroups !== undefined && idGroups !== '' && name !== undefined && name !== '') {
            const results = await favourites.deleteFavourite('group', idGroups, name)

            if(!results) {
                throw new Error('Failed to delete')
            } else if(results.rowCount === 0) {
                throw new Error('Nothing to delete')
            }
            res.status(200).json('Delete success');

        } else if (name === undefined || name === '') {
            throw new Error('Name not specified')
        } else {
            throw new Error('No user or group specified')
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllFavourites,
    getFavouritesFrom,
    addToFavourites,
    deleteFavourite,
};
