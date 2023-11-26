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

//Get by ID :D
/* const getAllFavourites = async (req, res) => {
    const userId = req.params.userId;
    const groupId = req.params.groupId;
    try {
        if(userId) {
            const result = await favourites.getAllFavourites({userId});
            console.log(result);
            res.status(200).send(result);
        } else if (groupId) {
            const result = await favourites.getAllFavourites({groupId});
            console.log(result);
            res.status(200).send(result);
        } else {
            res.status(400).json({ error: 'User ID or Group ID must be added' });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}; */

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
