const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class user extends Model { };

	user.init({
		account: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		user_name: DataTypes.STRING,
		passwd: DataTypes.STRING,
		create_at: DataTypes.DATE,
		update_at: DataTypes.DATE,
		last_login: DataTypes.DATE
	}, {
		timestamps: false,
		sequelize,
		modelName: 'user_table',
	});

	return user;
};