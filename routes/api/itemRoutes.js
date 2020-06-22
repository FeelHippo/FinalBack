const mongoose = require('mongoose');
const validator = require('validator');
const Item = mongoose.model('Item');
const valid_tags = require('../../models/Tags');
const filter_ads = require('../utils/url_query');

module.exports = (app) => {
    // return all valid tags
    app.get(`/api/tags`, async (req, res) => {
        return res.status(200).send(valid_tags.array);
    })
    // ads search
    app.get(`/api/item`, async (req, res, err) => {
        try {
            let params = filter_ads(req)
            let items = await Item.find(params);
            if (items) {
                return res.status(200).json(items);
            } else {
                return res
                    .status(202)
                    .json({ msg: "No ads found!" })
            }
            

        } catch (error) {
            console.log(error);
            next(err);
        }
    });
    // create ad
    app.post(`/api/item`, async (req, res) => {
        let item = await Item.create(req.body);
        return res.status(201).send({
            error: false,
            item
        })
    });
    // modify ad
    app.put(`/api/item/:id`, async (req, res) => {
        const { id } = req.params;

        let item = await Item.findByIdAndUpdate(id, req.body);

        return res.status(202).send({
            error: false,
            item
        })
    });
    // delete ad
    app.delete(`/api/item/:id`, async (req, res) => {
        const { id } = req.params;

        let item = await Item.findByIdAndDelete(id);

        return res.status(202).send({
            error: false,
            item
        })
    });
}