const favourites = require('../models/favouriteModel.js');

const addToFavourites = async (req, res) => {
    try {
        const result = await favourites.addToFavourites();
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getAllFavourites = async (req, res) => {
    const getFavouritesById = req.body;
    try {
        const result = await favourites.getAllFavourites(getFavouritesById);
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
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
    deleteFavourite
};
