const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

class LoginController {

    async register(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            // validate
            if(!validator.isEmail(email) || validator.isEmpty(email))
                return res
                    .status(202)
                    .json({ success: false, msg: "Not a valid email." }) 

            if(!validator.isAlphanumeric(password) || validator.isEmpty(password))
            return res
                .status(202)
                .json({ success: false, msg: "Password must contain alphanumeric characters." })

            // make sure user is not existing
            const existingUser = await User.findOne({ email });
            if(existingUser)
                return res
                    .status(202)
                    .json({ success: false, msg: "An account with this email already exists." })
            
            // encrypt password
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            const newUser = new User({
                email, 
                password: passwordHash
            })

            const savedUser = await newUser.save();
            res.json({ success: true })
        } catch (error) {
            console.log(error, '@ Login Controller');
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            // query to DDBB
            const user = await User.findOne({ email });
            // if no user is found, or if password is wrong:
            if (!user || !await bcrypt.compare(password, user.password)) {
                return res
                    .status(202)
                    .json({ success: false, msg: "Wrong credentials, try again." });
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })

            // found user, and password matches
            return res.status(200).json({
                email, 
                password, 
                success: true,
                token,
            }); 

        } catch (error) {
            console.log(error, '@ Login Controller');
            res.status(500).json({ error: error.message });
        }
    }

    async verify_token(req, res) {
        try {
            
            const token = req.header('x-auth-token');
            if (!token) return res.json(false);
            
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            if (!verified) return res.json(false);
            
            const user = await User.findById(verified._id);
            if (!user) return res.json(false);
            console.log(user);
            return res.json(true);
        } catch (error) {
            console.log(error, '@ Login Controller');
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new LoginController;