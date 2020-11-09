const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class article extends Model { };

    article.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        group: DataTypes.STRING,
        text: DataTypes.STRING,
        create_at: DataTypes.DATE,
        update_at: DataTypes.DATE
    }, {
        timestamps: false,
        sequelize,
        modelName: 'article_table',
    });

    return article;
};