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

    async user(req, res, err) {

        try {
            let { username } = req.params;
            let items = await Item.find({ creator: username });
            if(!items) {
                return res.status(202).json({ msg: 'No Ads Found.' })
            } else {
                return res.status(200).json(items);
            }

        } catch (error) {
            console.log(error);
        }
    }

    async add (req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({ msg: "Something Went Wrong, Try Again." })
            };
            const newItem = new Item(req.body);
            const savedItem = await newItem.save();

            res.status(201).send(savedItem);
        } catch (error) {
            console.log(error);
        }
    }

    async modify (req, res) {
        const { _id } = req.body;
        try {
            console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', req.body)
            let item = await Item.findByIdAndUpdate(_id, req.body);
            if(!item) {
                return res.status(422).json({ msg: "Something Went Wrong, Try Again." })
            } else {
                return res.status(201).json(item);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async delete (req, res) {
        const { id } = req.params;

        let item = await Item.findByIdAndDelete(id);
        if(!item) {
            return res.status(422).json({ msg: "Something Went Wrong, Try Again." })
        } else {
            return res.status(202).json(item);
        }
    }

}

module.exports = new ItemsController;