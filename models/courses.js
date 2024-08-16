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
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        duration: DataTypes.INTEGER,
        imgUrl: DataTypes.STRING,
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