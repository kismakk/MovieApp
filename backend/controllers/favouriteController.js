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
        const result = await favourites.addToFavourites(favouritesData);
        res.status(200).json({ message: 'Added to favourites successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getFavourites = async (req, res) => {
    const idUsers = req.query.id_users;
    //const idGroups = req.query.id_groups;
    console.log(idUsers)
    console.log(req.query)
     if(idUsers !== undefined) {
        try {
            await getFavourites('user', idUsers)
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }/*  else if (idGroups !== undefined) {
        try {
            getFavourites('group', idGroups)
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }  */
};

const deleteFavourite = async (req, res) => {
    const deleteFavouritesbyId = req.body;
    try {
        const result = await favourites.deleteFavourite(deleteFavouritesbyId);
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        console.error('Error in deleting favourite', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllFavourites,
    addToFavourites,
    deleteFavourite,
    getFavourites
};
