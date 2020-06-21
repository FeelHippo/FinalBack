const loginController = require('../loginController');

module.exports = (app) => {

    // create new account
    app.post(`/user/register`, loginController.register);

    //authenticate existing account + initiate JWT token
    app.post(`/user/login`, loginController.login);

    //app.get(`/user/logout`, loginController.logout);

}