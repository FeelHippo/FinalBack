const mongoose = require('mongoose');
const moment = require('moment');
const Item = mongoose.model('Item');
const valid_tags = require('../../models/Tags');
const filter_ads = require('../utils/url_query');
const { validationResult } = require('express-validator');

class ItemsController {

    async tags(req, res) {
        return res.status(200).send(valid_tags.array);
    }

    async home(req, res) {
        
        try {
            // max 1 week old items
            let items = await Item.find({
                created: {$gt: moment().subtract(1, 'week')}
            })
            if (items) {
                return res.status(200).json(items);
            } else {
                return res
                    .status(202)
                    .json({ msg: "No ads found!" })
            }
        } catch (error) {
            console.log(error);
        }
    }

    async search(req, res, err) {
        try {
            let params = filter_ads(req);
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

        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({ msg: errors.array()[0] })
            };
            const newItem = new Item(req.body);
            const savedItem = await newItem.save();

            res.status(201).send(savedItem);
        } catch (error) {
            console.log(error);
        }
    }

    async modify (req, res) {
        
        try {
            const { id } = req.params;

            let item = await Item.findByIdAndUpdate(id, req.body);

            return res.status(201).send(item)
        } catch (error) {
            console.log(error);
        }
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