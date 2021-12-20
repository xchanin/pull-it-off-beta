/**
 * Package that offers encyption functionality
 * that we can use in node.js
 */
 const bcrypt = require('bcryptjs');

 /**
  * Package for creation and validation
  * of tokens - if one character of this 
  * token is changed, then the server
  * invalidates and issues a new token
  */
 const jwt = require('jsonwebtoken');

 /**
  * Current user
  */
 const User = require('../models/user');

/**
 * Middlware for creating a new user
 * 
 * @param {*} req request
 * @param {*} res response
 * @param {*} next complete
 */
exports.CreatUser = (req, res, next) => {

    /**
     * Encypt password - protect it
     * 
     * The saltOrRounds - the higher the number here,
     * the longer it will take, but the more secure 
     * it will be
     */
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            /**
             * Create a new user whenever the route
             * '/signup' is hit
             */
            const user = new User({
                email: req.body.email,
                password: hash
            });

            user
            .save()
            .then(result => {
                /**
                 * 201 - created
                 */
                res.status(201).json( {
                    message: 'User created!',
                    result: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Create user failed',
                    // error: err
                })
            })
        });
}

/**
 * Middleware for logging in
 * 
 * @param {*} req request
 * @param {*} res response
 * @param {*} next complete
 */
exports.Login = (req, res, next) => {

    let fetchedUser;
    
    /**
     * Validate credentials
     * 
     * Check if user already exists
     */
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed - User doesn\'\t exist'
                })
            }

            /**
             * Compare input to encrypted value
             */
            fetchedUser = user;
            console.log('user from user.js', fetchedUser);
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {

            /**
             * If compare is false - invalid password
             */
            if(!result) {
                return res.status(401).json({
                    message: 'Authentication failed - Incorrect Password'
                })
            }
            /**
             * Valid password
             * 
             * Create a new token with data
             * of choice - expires in one hour
             */
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );

            res.status(200).json({
                token: token,
                /**
                 * Send expire duration in seconds -
                 * can send in other formats too
                 */
                expiresIn: 3600,

                /**
                 * Pass user id whenever we log in
                 */
                userId: fetchedUser._id
            })
        })

        /**
         * Catch additional errors
         */
        .catch(err => {
            return res.status(401).json({
                message: 'Invalid authentication!'
            })
        });
}