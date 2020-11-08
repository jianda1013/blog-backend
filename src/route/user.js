const { check, validationResult } = require('express-validator');

const signup = '/user/signup';
const login = '/user/login';
const userFunc = require('../function/user');

module.exports = function (app, cors) {
	app.post(
		signup,
		[
			check("account", "[NotCompleteError] account undefine").exists(),
			check("passwd", "[NotCompleteError] account undefine").exists(),
			check("account", "[InvalidError] invalid account, must be only english, number, @, -, _, .").custom(account => {
				if (!/^[a-zA-Z0-9_\-@.]*$/g.test(account)) {
					throw false;
				}
				return true;
			}),
			check("user_name", "[InvalidError] invalid name, must be only english, number").custom(user_name => {
				if (!/^[a-zA-Z0-9]*$/g.test(user_name)) {
					throw false;
				}
				return true;
			}),
			check("account", "[DuplicateError] account already exist").custom(async account => {
				if (await userFunc.account_exist(account)) {
					throw false;
				}
				return true;
			})
		],
		cors(),
		async function (req, res) {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			var account = req.query.account;
			var user_name = req.query.user_name
			var passwd = req.query.passwd;
			res.send(await userFunc.create(account, passwd, user_name));
		}
	);
	app.post(
		login,
		[
			check("account").exists(),
			check("passwd").exists(),
			check("account", "[NotFoundError] no such account exist").custom(async account => {
				if (!await userFunc.account_exist(account)) {
					throw false;
				}
				return true;
			}),
			check("passwd", "[PassWordError] wrong password").custom(async (passwd, {req}) => {
				if(!await userFunc.passwdCheck(req.query.account, passwd)){
					throw false;
				}
				return true;
			})
		],
		cors(),
		async function (req, res) {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			res.send(await userFunc.login(req.query.account));
		}
	)
}