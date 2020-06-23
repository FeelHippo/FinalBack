const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const valid_tags = require('../../models/Tags');
const filter_ads = require('../utils/url_query');

class ItemsController {

    async tags(req, res) {
        return res.status(200).send(valid_tags.array);
    }

    async search(req, res, err) {
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
    }

    async searchOne(req, res, err) {
        try {
            let { id } = req.params;
            let item = await Item.findById(id);
            if (item) {
                return res.status(200).json(item);
            } else {
                return res
                    .status(202)
                    .json({ msg: "Ad not found!" })
            }
            

        } catch (error) {
            console.log(error);
            next(err);
        }
    }

    async add (req, res) {
        console.log(req.body)
        let item = await Item.create(req.body);
        return res.status(201).send({
            error: false,
            item
        })
    }

    async modify (req, res) {
        const { id } = req.params;

        let item = await Item.findByIdAndUpdate(id, req.body);

        return res.status(202).send({
            error: false,
            item
        })
    }

    async delete (req, res) {
        const { id } = req.params;

        let item = await Item.findByIdAndDelete(id);

        return res.status(202).send({
            error: false,
            item
        })
    }

}

module.exports = new ItemsController;