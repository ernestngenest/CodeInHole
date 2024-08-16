'use strict';
const {
    Model
} = require('sequelize');
var bcrypt = require('bcryptjs');
const customBcrypt = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            User.hasOne(models.Profile, { foreignKey: 'userId' })

            User.belongsToMany(models.Course, { through: 'UserCourse', foreignKey: 'userId' })
        }
    }
    User.init({
        email: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'email harus unik'
            }
        },
        password: DataTypes.STRING,
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    User.beforeCreate((user, options) => {
        let temp = user.password
        user.password = customBcrypt(temp)
    })
    return User;
};