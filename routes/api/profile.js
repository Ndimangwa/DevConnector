const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//@route        GET /api/profile/me
//@desc         Get current user profile
//@access       Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
                                .populate('user', ['name', 'avatar']);
        if (! profile)  {
            //console.log('No profile for this user');
            return res.status(400).json({ msg : 'There is no profile for the user' });
        }
        //console.log('Logged profile data');
        res.json(profile);
    } catch (err)   {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});
//@route        POST /api/profile
//desc          Create & Update user profile
//@access       Private
router.post('/', [
    auth, [
        check('status', 'status is required')
            .not()
            .isEmpty(),
        check('skills', 'skill(s) is required')
            .not()
            .isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Now extracting submitted data
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;
    //Build profile object
    const profileFields = {};
    //Now assign data
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status; //No need already validated
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        //No need of if, already validated
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    //Working with social
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    //Now we need to save if create or update
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile)    {
            //profile exists , we just want to update
            profile = await Profile.findOneAndUpdate({ user: req.user.id },
                                        { $set: profileFields },
                                        { new: true }); //return an updated document
            return res.json(profile);
        }
        //Now we need to create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err)   {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;