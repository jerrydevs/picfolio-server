const express = require('express');
const { check, validationResult } = require('express-validator');
const fs = require('fs');

const auth = require('../../middleware/auth');
const User = require('../../models/user');
const ProfilePhoto = require('../../models/ProfilePhoto');
const uploadProfilePhoto = require('./uploadProfilePhoto');

const router = express.Router();

// @route    POST api/photo
// @desc     Upload a photo for signed-in user
// @access   Private
router.post('/', [auth, uploadProfilePhoto.single('myPhoto')], async (req, res) => {
  try {


    const file = req.file;
    if (!file) {
      return res.status(400).send({msg: 'Please upload a file'});
    }

    const profilePhoto = fs.readFileSync(req.file.path);
    const encoded_photo = profilePhoto.toString('base64');

    const finalPhoto = new ProfilePhoto({
      profilePhoto: Buffer.from(encoded_photo, 'base64'),
      user: req.user.id,
      })

    await finalPhoto.save();
    res.send(finalPhoto);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/photo
// @desc     Get logged-in user's photos
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profilePhotos = await ProfilePhoto.find({user: req.user.id});
    if (!profilePhotos){
      res.status(400).send({msg: 'No profile photos found'});
    }

    res.send(profilePhotos);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;
