const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
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
    const errors = {}; // this is errors object

    Profile.findOne({
        user: req.user.id // see the Profile.js in models 
    })
        .populate('user', ['name', 'avatar']) // lecture #20 minute 17, see after you add this you run the postman, your user will look like an object, and you'll be able to see the avatar
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            // if there is profile
            res.json(profile);
        })
        .catch(err => res.status(404).json(err)); // if there is another error
});

// LECTURE #21
// @route   GET api/profile/handle/:handle
// @desc    GET profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({
        handle: req.params.handle
    })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    GET profile by user ID
// @access  Public 
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({
        user: req.params.user_id
    })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        }) //.catch(err => res.status(404).json(err)); this is the default error
        .catch(err => res.status(404).json({
            profile: 'Error from line 82: There is no profile for this user'
        }));
});

// @route   GET api/profile/all
// @desc    GET all profiles
// @access  Public 
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({
            profile: 'There are no profiles'
        }));
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
    const {
        errors,
        isValid
    } = validateProfileInput(req.body);
    // Check Validation, we want to do this at the beginning of anything that we're trying to validate 
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
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
    }).then(profile => {
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
                    errors.handle = 'That handle already exists';
                    res.status(400).json(errors);
                }

                // Save Profile
                new Profile(profileFields).save().then(profile => res.json(profile));
            });
        }
    });
});

// #LECTURE 22
// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Public 

router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check validation
    if (!isValid) {
        // return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({
        user: req.user.id
    })
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            // Add to exp array, side note: we use unshift instead of push because we want newExp to be added to the beginning
            profile.experience.unshift(newExp);
            // it will add the experience and it will return the profile with the new experience
            // on the FRONT END application it will update our state and we'll be able to see that new experience
            profile.save().then(profile => res.json(profile));
        })
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Public 

router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check validation
    if (!isValid) {
        // return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({
        user: req.user.id
    })
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            // Add to exp array, side note: we use unshift instead of push because we want newEdu to be added to the beginning
            profile.education.unshift(newEdu);
            // it will add the education and it will return the profile with the new education
            // on the FRONT END application it will update our state and we'll be able to see that new experience
            profile.save().then(profile => res.json(profile));
        })
});

module.exports = router;