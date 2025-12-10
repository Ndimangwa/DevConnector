const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');
    //Check if not token
    if (! token)    {
        return res.status(401).json({
            msg: 'No token, Authorization denied'
        });
    }
    //Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user; //Remember in payload we created user object
        //As usual we call next function
        next();
    } catch (err)   {
        console.error(err.message);
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
};