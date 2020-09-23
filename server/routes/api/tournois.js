const express = require('express');
const router = express.Router();
const Tournoi = require('../../models/Tournoi');
const User = require('../../models/User');
const Filter = require('bad-words');
const ImageService = require('../../services/ImageService');

const { checkAuthentication } = require('./auth');

// Get all Tournois
router.get('/', async (req, res) => {

    const user = await req.user;
    if (req.query['author'] &&
        req.isAuthenticated() &&
        await user.username === req.query['author']) {

        return res.send(await getTournoiByAuthor(req.query['author']));
    } 

    try {
        let tournois = await Tournoi.find({}, {participants: {$slice: 2}}, {lean: true}).select('title author size likes participants');
        // let tournois = await Tournoi.find({}, {lean: true}).select('title author ')
        tournois.forEach(tournoi => {
            tournoi.thumbnails = [];
            tournoi.thumbnails[0] = tournoi.participants[0].image;
            tournoi.thumbnails[1] = tournoi.participants[1].image;
            delete tournoi.participants;
        });
        return res.send(tournois);
    } catch(err) {
        console.error(err.message);
        return res.send(err.message);
    }
});

// Get a specific Tournoi
router.get('/:id', async (req, res) => {

    try {
        const tournoi = await Tournoi.findById({_id: req.params.id});
        return res.send(tournoi);
    } catch(err) {
        return res.status(404).send(err);
    }
})

// Get tournoi by username
const getTournoiByAuthor = async(author) => {
    try {
        const tournois = await Tournoi.find({ author: author });
        return tournois;
    } catch(err) {
        console.log(err);
    }
    
}

// Post a Tournoi
router.post('/', checkAuthentication, async(req, res) => {
    // if no image urls are provided
    if (!req.body.images) return res.status(404).send('no images');
    if (req.body.size != req.body.images.length) return res.status(404).send('size does not match number of images');
    
    const urls = req.body.images;

    // Participants
    const participants = [];
    urls.forEach((url, i) => {
        participants.push({
            id: i,
            image: url
        });
    });

    // Tournoi
    const user = await req.user;
    const user_id = user._id;
    console.log(user);
    console.log( await req.user);
    console.log(user_id);
    const user_name = await User.findById({'_id': user_id}, {'username':1, '_id':0});

    const filter = new Filter();
    const tournoi = new Tournoi({
        title: filter.clean(req.body.title.trim()),
        size: req.body.size,
        author: user_name.username,
        participants: participants
    });

    // Save to DB
    try {
        const savedTournoi = await tournoi.save();
        return res.send(savedTournoi);
    } catch(err) {
        console.log(err);
        return res.status(404).send(err.message);
    }

});

// Like a tournoi
router.put('/:id/like', async(req, res) => {
    try {
        // retrieve it
        const oldTournoi = await Tournoi.findById(req.params.id);
        const newLikes = oldTournoi.likes + 1;
        // udpate it
        const filter = { _id: req.params.id };
        const update = { likes: newLikes };
        const tournoi = await Tournoi.findOneAndUpdate(filter, update, {
            new: true,
            useFindAndModify: false
        });
        console.log(tournoi);
        return res.send(tournoi);
    } catch(err) {
        console.log(err);
        return res.status(404);
    }
})

// Update a tournoi
router.put('/:id', async (req, res) => {
    if (!req.body.totalPlayed || !req.body.participants) return res.status(404).send('bad arguments');
    // Filter by which we find our tournoi in the db
    const filter = {
        _id: req.params.id
    };
    // Attributes to update once we found it
    const update = {
        totalPlayed: req.body.totalPlayed,
        participants: req.body.participants
    };

    try {
        const tournoi = await Tournoi.findOneAndUpdate(filter, update, {
            new: true,
            useFindAndModify: false
        });
        return res.send(tournoi);
    } catch(err) {
        return res.send(err);
    }
});


// TODO: Delete a tournoi
router.delete('/:id', checkAuthentication, async (req, res) => {
    // Filter to find the tournoi to delete
    const filter = { _id: req.params.id };

    const tournoi = await Tournoi.findById(req.params.id);
    tournoi.participants.forEach(p => {
        ImageService.deleteImage(p.image);
    });
    
    try {
        await Tournoi.deleteOne(filter);
        /* ImageService.deleteImage(req.params.id); */
        return res.send("sucessfully deleted");
    } catch(err) {
        return res.status(418).send(err.message);
    }
})



module.exports = router;