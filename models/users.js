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
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Email tidak boleh kosong'
                },
                notNull: {
                    msg: 'Email tidak boleh kosong'
                }
            },
            unique: {
                args: true,
                msg: 'email harus unik'
            },
            isEmail: {
                args: true,
                msg: 'format email salah'
            }

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Password tidak boleh kosong'
                },
                notNull: {
                    msg: 'Password tidak boleh kosong'
                }
            }
        },
        role: {
            type: DataTypes.STRING,
        }
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