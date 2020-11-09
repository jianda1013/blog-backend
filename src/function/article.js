const db = require('../db').article

module.exports = {

    async list_title(group = null) {
        if (group) {
            return await db.findAll({
                attributes: ['id', 'title', 'update_at']
            }, {
                where: {
                    group: group
                }
            })
        } else {
            return await db.findAll({
                attributes: ['id', 'title', 'update_at']
            })
        }
    },

    async new(title, group, text) {
        var article = {
            title: title,
            group: group,
            text: text,
            create_at: new Date(),
            update_at: new Date()
        }
        await db.create(article);
        return article;
    },

    async update(id, title, group, text) {
        var count = await db.count({
            where: {
                id: id
            }
        })
        if(count !== 1){
            return null;
        }else{
            var updateinfo = {}
            if(title !== undefined){
                updateinfo['title'] = title;
            }
            if(group !== undefined){
                updateinfo['group'] = group;
            }
            if(text !== undefined){
                updateinfo['text'] = text;
            }
            updateinfo['update_at'] = new Date();
            await db.update({
                updateinfo
            }, {
                where: {
                    id: id
                }
            })
            return updateinfo
        }
    },

    async get_article(id) {
        return await db.findOne({
            where: {
                id: id
            }
        })
    }
}