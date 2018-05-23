const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load Profile Modeal
const Profile = require('../../models/Profile');
// load User Profile
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public

router.get("/test", (req, res) => res.json({
    msg: "profile works"
}));

// @route   GET api/profile/test
// @desc    GET Current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/test
// @desc    Create user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // Get fields -- we will get everything in request.body... 
    // fill the profileFields object with all the stuff including social object
    // Then we will search for the user by the logged in user id we will update it
    // with this (findOneAndUpdate), if they don't we wanna make sure there is no handle
    // with that name, if there is we'll send back an error.. if not we will create the profile
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    // Skills - split into array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    // Social - we need to initialize profileFields into empty object
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (profile) {
                // update
                Profile.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $set: profileFields
                }, {
                    new: true
                }).then(profile => res.json(profile));
            } else {
                //Create

                // Check if handle exists
                Profile.findOne({
                    handle: profileFields.handle
                }).then(profile => {
                    if (profile) {
                        errors.handle = 'That handle already exists'
                    }

                    // Save Profile
                    new Profile(profileFields).save().then(profile => res.json(profile));
                });
            }
        });
});


module.exports = router;