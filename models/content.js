'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Content extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Content.belongsTo(models.Course, { foreignKey: 'courseId' })
        }
    }
    Content.init({
        title: DataTypes.STRING,
        Url: DataTypes.STRING,
        courseId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Courses',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Content',
    });
    return Content;
};