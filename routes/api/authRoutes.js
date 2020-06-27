const loginController = require('../controllers/loginController');

module.exports = (app) => {

    // create new account
    app.post(`/user/register`, loginController.register);

    //authenticate existing account + initiate JWT token
    app.post(`/user/login`, loginController.login);
    app.post(`/tokenIsValid`, loginController.verify_token);
    app.post(`/password`, loginController.send_password)

}