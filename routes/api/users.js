const express = require('express');
const {check, validationResult} = require('express-validator');
const gravatar  = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const User = require('../../models/User');

//@route        POST /api/users
//@desc         Register User
//@access       Public
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email address')
        .isEmail(),
    check('password', 'Please enter 6 or more characters')
        .isLength({ min: 6 })
], async (req, res) => {
    //Working on errors
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Now putting logic
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email }); //{ email } same as { email : email }
        //1. Check if user exits
        if (user)   {
            return res.status(400).json({ errors: [{ msg: 'User Already Exists!!!' }] });
        }
        //2. Get User gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        //3. Create User
        user = new User({
            name,
            email,
            avatar,
            password
        });
        //4. Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        //5. Now saving
        await user.save();
        //6. Return jsonwebtoken (jwt)
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