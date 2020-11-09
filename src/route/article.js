const { check, validationResult } = require('express-validator');

const list = '/article/list';
const text = '/article/text'
const create = '/article/create';
const update = '/article/update';

const articleFunc = require('../function/article');
const userFunc = require('../function/user');

module.exports = function (app, cors) {
    app.get(
        list,
        cors(),
        async function (req, res) {
            res.send(await articleFunc.list_title(req.query.group));
        }
    );
    app.get(
        text,
        [
            check("id").exists()
        ],
        cors(),
        async function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            res.send(await articleFunc.get_article(req.query.id));
        }
    )
    app.post(
        create,
        [
            check("token").exists(),
            check("token", "TOKEN_ERROR").custom(async token => {
                if (!await userFunc.verifyToken(token)) {
                    throw false;
                }
                return true;
            }),
            check("group").exists(),
            check("title").exists(),
            check("text").exists(),
        ],
        cors(),
        async function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            res.send(await articleFunc.new(req.query.title, req.query.group, req.query.text));
        }
    );
    app.put(
        update,
        [
            check("token").exists(),
            check("token", "TOKEN_ERROR").custom(async token => {
                if (!await userFunc.verifyToken(token)) {
                    throw false;
                }
                return true;
            }),
            check('id').exists()
        ],
        cors(),
        async function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            res.send(await articleFunc.update(req.query.id, req.query.title, req.query.group, req.query.text))
        }
    )
}