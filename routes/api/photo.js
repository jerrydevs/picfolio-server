const express = require('express');
const { check, validationResult } = require('express-validator');
const fs = require('fs');

const auth = require('../../middleware/auth');
const User = require('../../models/user');
const Photo = require('../../models/Photo');
const upload = require('./upload');

const router = express.Router();

// @route    POST api/photo
// @desc     Upload a photo for signed-in user
// @access   Private
router.post('/', [auth, upload.single('myPhoto')], async (req, res) => {
  try {

    
    const file = req.file;
    if (!file) {
      return res.status(400).send({msg: 'Please upload a file'});
    }

    const photo = fs.readFileSync(req.file.path);
    const encoded_photo = photo.toString('base64');

    const finalPhoto = new Photo({
      photo: Buffer.from(encoded_photo, 'base64'),
      user: req.user.id,
      caption: req.body.caption
    })

    await finalPhoto.save();
    res.send(finalPhoto);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/photo/me
// @desc     Get logged-in user's photos
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const photos = await Photo.find({user: req.user.id});
    if (!photos){
      res.status(400).send({msg: 'No photos found'});
    }

    res.send(photos);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;