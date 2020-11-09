const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db').user;

module.exports = {

    async verifyToken(token) {
        var result = await jwt.verify(token, process.env.SECRET);
        if (result !== undefined) {
            return true;
        } else {
            return false;
        }
    },

    async account_exist(account) {
        var result = await db.count({
            where: {
                account: account
            }
        })
        return result;
    },

    async create(account, passwd, user_name = null) {
        var condition = {};
        condition['create_at'] = new Date();
        condition['update_at'] = new Date();
        condition['account'] = account;
        condition['passwd'] = await bcrypt.hash(passwd, 10);
        condition['user_name'] = user_name;
        await db.create(condition);
        return condition;
    },

    async login(account) {
        await db.update({
            last_login: new Date()
        }, {
            where: {
                account: account
            }
        })
        return await jwt.sign({ account: account }, process.env.SECRET, { expiresIn: '24h' })
    },

    async passwdCheck(account, passwd) {
        var account_passwd = await db.findOne({
            where: {
                account: account
            }
        });
        if (account_passwd == null) {
            return false
        }
        var test = await bcrypt.compare(passwd, account_passwd['passwd']);
        return test;
    }
}