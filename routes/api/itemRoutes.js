const { check } = require('express-validator');
const itemsController = require('../controllers/itemsController');
const upload = require('../utils/fileUpload');

module.exports = (app) => {
    // return most recent ads
    app.get(`/api/item/home`, itemsController.home);
    // return all valid tags
    app.get(`/api/tags`, itemsController.tags);
    // ads search one
    app.get(`/api/item/:id`, itemsController.searchOne);
    // ads search
    app.get(`/api/item`, itemsController.search);
    app.get(`/api/:username`, itemsController.user)
    // create ad, validate URL
    app.post(`/api/item`, upload.single('photo'), [
        check('name').custom((value)=>{
            if(isNaN(value)){
                return true;
            }else{
                throw new Error('invalid name')
            }
        }),
        check('type').isBoolean(),
        check('price').isNumeric().withMessage('Must be higher than zero'),  
    ], itemsController.add);
    // modify ad
    app.put(`/api/item/change/`, upload.single('photo'), itemsController.modify);
    // delete ad
    app.delete(`/api/item/:id`, itemsController.delete);
}