const mongoose = require('mongoose');
const moment = require('moment');
const Item = mongoose.model('Item');
const User = require('../../models/User');
const valid_tags = require('../../models/Tags');
const filter_ads = require('../utils/url_query');
const { validationResult } = require('express-validator');
const emailTemplate = require('../../models/Email');

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
            let favorites = await Item.find({ favorite: username });
            if(!items) {
                return res.status(202).json({ msg: 'No Ads Found.' })
            } else {
                return res.status(200).json({items, favorites});
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
            const newItem = new Item({
                name: req.body.name,
                price: req.body.price,
                type: req.body.type === "true" ? true : false,
                description: req.body.description,
                tags: [req.body.tag1, req.body.tag2],
                photo: req.file.filename,
            });
            const savedItem = await newItem.save();
            res.status(201).send(savedItem);
        } catch (error) {
            console.log(error);
        }
    }

    async modify (req, res) {
        const { _id } = req.body;
        try {
            let item = await Item.findByIdAndUpdate(_id, req.body);
            if(!item) {
                return res.status(422).json({ msg: "Something Went Wrong, Try Again." })
            } else {
                // send email notification if item is sold
                if(req.body.sold) {
                    item.favorite.map(username => {
                        User.findOne({ username: username }).then(user => {
                            item.sendEmail(emailTemplate.sold(user.email, item.name), (err, info) => {
                                if(err) {
                                    return console.log(err);
                                }
                                console.log('Message sent: %s', info.messageId)
                            });
                        })
                    })
                }
                // send email notification if item is reserved
                if(req.body.reserved) {
                    item.favorite.map(username => {
                        User.findOne({ username: username }).then(user => {
                            item.sendEmail(emailTemplate.reserved(user.email, item.name), (err, info) => {
                                if(err) {
                                    return console.log(err);
                                }
                                console.log('Message sent: %s', info.messageId)
                            });
                        })
                    })
                }
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