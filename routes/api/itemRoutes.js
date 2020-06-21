const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const valid_tags = require('../../models/Tags');

module.exports = (app) => {

    app.get(`/api/item`, async (req, res) => {
        let items = await Item.find();
        return res.status(200).send(items);
    });

    app.get(`/api/tags`, async (req, res) => {
        return res.status(200).send(valid_tags.array);
    })

    app.post(`/api/item`, async (req, res) => {
        let item = await Item.create(req.body);
        return res.status(201).send({
            error: false,
            item
        })
    });

    app.put(`/api/item/:id`, async (req, res) => {
        const { id } = req.params;

        let item = await Item.findByIdAndUpdate(id, req.body);

        return res.status(202).send({
            error: false,
            item
        })
    });

    app.delete(`/api/item/:id`, async (req, res) => {
        const { id } = req.params;

        let item = await Item.findByIdAndDelete(id);

        return res.status(202).send({
            error: false,
            item
        })
    });
}