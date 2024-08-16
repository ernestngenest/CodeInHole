'use strict';
const {
    Model,
    Op,
    where
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Course.hasMany(models.Content, { foreignKey: 'courseId' })
            Course.belongsTo(models.Category, { foreignKey: 'categoryId' })
            Course.belongsToMany(models.User, { through: 'UserCourse', foreignKey: 'courseId' })
        }
        static async getAllFiltered(search) {
            try {
                let option = {}
                if (search) {
                    option.where = {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    }
                }
                let data = await Course.findAll(option);
                return data
            } catch (error) {
                throw error
            }
        }
        get getFullName() {
            return 'Pelatihan' + ' ' + this.name
        }
    }
    Course.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Nama Course tidak boleh kosong'
                },
                notNull: {
                    msg: 'Nama Course tidak boleh kosong'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Description tidak boleh kosong'
                },
                notNull: {
                    msg: 'Description tidak boleh kosong'
                }
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Duration tidak boleh kosong'
                },
                notNull: {
                    msg: 'Duration tidak boleh kosong'
                }
            }
        },
        imgUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'ImgUrl tidak boleh kosong'
                },
                notNull: {
                    msg: 'ImgUrl tidak boleh kosong'
                }
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Categories',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Course',
    });
    return Course;
};