const loginController = require('../controllers/loginController');

module.exports = (app) => {
    // verify user is registered
    app.get(`/user/login/:user`, loginController.verify);

    // create new account
    app.post(`/user/register`, loginController.register);
    // update existing account
    app.put(`/user/update`, loginController.update);

    //authenticate existing account + initiate JWT token
    app.post(`/user/login`, loginController.login);
    app.post(`/tokenIsValid`, loginController.verify_token);
    app.post(`/password`, loginController.send_password)

    // delete account
    app.delete(`/user/:username`, loginController.delete);

}