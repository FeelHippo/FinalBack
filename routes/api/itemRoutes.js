const itemsController = require('../controllers/itemsController');

module.exports = (app) => {
    // return all valid tags
    app.get(`/api/tags`, itemsController.tags);
    // ads search one
    app.get(`/api/item/:id`, itemsController.searchOne);
    // ads search
    app.get(`/api/item`, itemsController.search);
    // create ad
    app.post(`/api/item`, itemsController.add);
    // modify ad
    app.put(`/api/item/:id`, itemsController.modify);
    // delete ad
    app.delete(`/api/item/:id`, itemsController.delete);
}