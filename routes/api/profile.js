const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const { ValidatorsImpl } = require('express-validator/lib/chain');

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
        //One important step , you need to verify user
        const user = await User.findOne({ _id: req.user.id });
        if (! user) {
            return res.status(400).json({ msg: 'User does not exist, the user must be available first' });
        }

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
//@route        GET /api/profile
//@desc         Get All Profiles
//@access       Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate(['user'], ['name', 'avatar']);
        res.status(200).json(profiles);
    } catch (err)   {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//@route        GET /api/profile/user/:user_id
//@desc         Get Profile by user_id
//@access       Public
router.get('/user/:user_id', async (req, res)   =>  {
    const profile_not_found_error = 'Profile Not Found';
    try {
        const profile = await Profile.findOne({ user: req.params.user_id })
                                        .populate(['user'], ['name', 'avatar']);
        if (! profile)  {
            return res.status(400).json({ msg : profile_not_found_error });
        }
        res.json(profile);
    } catch (err)   {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: profile_not_found_error });
        }
        res.status(500).send('Server Error');
    }
});
//@route        DELETE /api/profile
//@desc         Delete Posts ,Profile, User of a logged-in user
//@access       Private
router.delete('/', auth, async (req, res) => {
    try {
        //Delete Posts related to this user
        await Post.deleteMany({ user: req.user.id });
        //Delete Profile
        await Profile.findOneAndDelete({ user: req.user.id });
        //Delete User
        await User.findOneAndDelete({ _id: req.user.id });
        //return
        res.status(200).json({ msg: "User Deleted Successful" });
    } catch (err)   {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//@route        PUT /api/profile/experience
//@desc         Add an experience to profile
//@access       Private
router.put('/experience', [
        auth, 
        [
            check('title', 'Title is required')
                .not()
                .isEmpty(),
            check('company', 'Company is required')
                .not()
                .isEmpty(),
            check('from', 'Date (from) is required')
                .not()
                .isEmpty()
        ]
    ], async (req, res)  =>  {
        const errors = validationResult(req);
        if (! errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExp);
            await profile.save();
            res.status(200).json(profile);
        } catch (errr) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
});
//@route        DELETE  /api/profile/experience/:exp_id [Actually we can use PUT too]
//@desc         Delete experience
//@access       Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        //get index to remove
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        if (removeIndex)    {
            profile.experience.splice(removeIndex, 1);
            await profile.save();
        }
        //return profile
        res.json(profile);
    } catch (err)   {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//@route        PUT /api/profile/education
//@desc         Add an education to profile
//@access       Private
router.put('/education', [
    auth, 
    [
        check('school', 'School is required')
            .not()
            .isEmpty(),
        check('degree', 'Degree is required')
            .not()
            .isEmpty(),
        check('fieldofstudy', 'Field Of Study is requred')
            .not()
            .isEmpty(),
        check('from', 'Date (from) is required')
            .not()
            .isEmpty()
    ]
], async (req, res)  =>  {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        res.status(200).json(profile);
    } catch (errr) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//@route        DELETE  /api/profile/education/:edu_id [Actually we can use PUT too]
//@desc         Delete experience
//@access       Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        //get index to remove
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        if (removeIndex)    {
            profile.education.splice(removeIndex, 1);
            await profile.save();
        }
        //return profile
        res.json(profile);
    } catch (err)   {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//@route        GET /api/profile/github/:username
//@desc         Get user repos from Github
//@access       Public
router.get('/github/:username', (req, res)  => {
    try {
        const options = {
            uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubclientId')}&client_secret=${config.get('githubsecret')}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        };
        //Now let us go
        request(options, (error, response, body) => {
            if (error) console.error(error);
            if (response.statusCode !== 200)    {
                return res.status(404).json({ msg: 'No Github Profile found' });
            }
            return res.json(JSON.parse(body));
        });
    } catch (err)   {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;