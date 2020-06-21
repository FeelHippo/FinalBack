const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {

    async register(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            // validate !!!

            // make sure user is not existing
            const existingUser = await User.findOne({ email });
            if(existingUser)
                return res
                    .status(400)
                    .json({ msg: "An account with this email already exists." })
            
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
                return res.status(403).json({ email, password: '', success: false });
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })

            // found user, and password matches
            return res.status(200).json({
                token,
                user: { email, password, success: true }
            }); 

        } catch (error) {
            console.log(error, '@ Login Controller');
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new LoginController;