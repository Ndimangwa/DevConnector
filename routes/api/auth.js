const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route        GET /api/auth
//@desc         Test Route
//@access       Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err)   {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route        POST /api/auth
//@desc         Authenticating Users
//@access       Public
router.post('/', [
    check('email', 'Please include a valid email address')
        .isEmail(),
    check('password', 'Password is required')
        .exists()
], async (req, res) => {
    //Working on errors
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Now putting logic
    const { email, password } = req.body;
    //Invalid-credentials message
    const msgInvalidCredentials = 'Invalid Credentials';

    try {
        let user = await User.findOne({ email }); //{ email } same as { email : email }
        //1. Check if user exits
        if (! user)   {
            return res.status(400).json({ errors: [{ msg: msgInvalidCredentials }] });
        }
        //2. Check password matching , bcrypt.compare(plain-text-password, encrypted-password)
        const isMatch = await bcrypt.compare(password, user.password);
        if (! isMatch)  {
            return res.status(400).json({ errors: [{ msg: msgInvalidCredentials }] });
        }

        //3. Return jsonwebtoken (jwt)
        const payload = {
            user: {
                id: user.id
            }
        };
        //Now jwt sign
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            return res.status(200).json({ token });
        });
    } catch (err)   {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
});


module.exports = router;