const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class user_management extends Model { };

	user_management.init({
		account: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		user_name: DataTypes.STRING,
		passwd: DataTypes.STRING,
		create_at: DataTypes.DATE,
		update_at: DataTypes.DATE,
		last_loggin: DataTypes.DATE
	}, {
		timestamps: false,
		sequelize,
		modelName: 'user_table',
	});

	return user_management;
};