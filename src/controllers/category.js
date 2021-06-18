import mongoose from 'mongoose';
import { Router } from 'express';
import Category from '../models/category';
import bodyParser from 'body-parser';

const categoryValidator = require('../validation/category-validation');
const utils = require('../common/Utilities');
const constants = require('../common/constants');
export default ({ config, db }) => {
    let api = Router();

    // 'api/v1/category' - POST: Create category
    api.post('/', (req, res) => {

        /* Validate Parameters */
        let result = categoryValidator.validateCategoryName(req.body.name);
        if (!result.isSuccess) {
            let response = utils.responseError(result.message, constants.HTTP_CODE_VALIDATION_FAIL);
            res.json(response, response.code);
        }

        /* Create category model */
        let categoryModel = new Category();
        categoryModel.name = req.body.name;
        categoryModel.save(function (err) {
            if (err) {
                res.json(utils.responseError());
            }
            res.json(utils.responseSuccess());
        });
    });

    // '/api/v1/category' - GET all category
    api.get('/', (req, res) => {
        let result = {};
        /* Find Category records */
        Category.find({}, (err, categories) => {
            if (err) {
                res.json(utils.responseError());
            }

            result = utils.responseSuccess(categories);
            res.json(result, result.code);
        });
    });

    // 'api/v1/category/:id' - GET specific category
    api.get('/:id', (req, res) => {
        Category.findById(req.params.id, (err, category) => {
            if (err) {
                res.json(utils.responseError());
            }
            res.json(utils.responseSuccess(category));
        });
    });

    // 'api/v1/category/:id' - PUT - update an existing record
    api.put('/:id', (req, res) => {
        Category.findById(req.params.id, (err, category) => {
            if (err) {
                res.json(utils.responseError());
            }
            category.name = req.body.name;
            category.save(function (err) {
                if (err) {
                    res.json(utils.responseError());
                }
                res.json({ message: 'Category info updated' });
            });
        });
    });

    // '/v1/category/:id' - DELETE - remove a category
    api.delete('/:id', (req, res) => {
        console.log('======= DELETE CATEGORY ID:', req.params.id);
        Category.deleteOne({
            _id: req.params.id
        }, (err, category) => {
            if (err) {
                console.log('====== DELETE ERROR', err);
                res.json(utils.responseError());
            }
            res.json(utils.responseSuccess(null, "Category Successfully Removed"));
        });
    });

    return api;
}