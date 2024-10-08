const { Op, where } = require('sequelize')
const { Course, Category } = require('../models')
const upload = require('../config/multerConfig')
class CourseController {
    static async home(req, res) {
        res.render('home')
    }
    static async getAllCourse(req, res) {
        try {
            const { search, deleted } = req.query
            let data = await Course.getAllFiltered(search);
            // console.log(req.session)
            const { userId, role } = req.session
            res.render('AllCourse', { data, userId, role, deleted });
        } catch (error) {
            res.send(error.message)
        }
    }
    static async addCourse(req, res) {
        try {
            const { errors } = req.query;
            let data = await Category.findAll();
            res.render('AddCourse', { data, errors });
        } catch (error) {
            res.send(error.message)
        }

    }


    static async postAddCourse(req, res) {
        upload(req, res, async(err) => {
            try {
                // res.send(req.body)
                let data = await Category.findAll();

                if (err) {
                    throw err
                        // console.error('Multer error:', err);
                        // return res.render('AddCourse', {
                        //     msg: err,
                        //     data
                        // });
                }

                if (!req.file) {
                    throw {
                        name: "error_multer",
                        errors: [{
                            message: 'No file selected!'
                        }],
                        data
                    }
                    // console.log('No file uploaded');
                    // return res.render('AddCourse', {
                    //     msg: 'No file selected!',
                    //     data
                    // });
                }

                const { name, description, duration, categoryId } = req.body;
                // console.log(name)
                let imgUrl = req.file.filename;
                console.log('Request body:', req.body);
                let temp = imgUrl;
                imgUrl = '../uploads/' + temp;

                await Course.create({
                    name,
                    description,
                    imgUrl,
                    duration,
                    categoryId
                });

                console.log('successfully created');
                res.redirect('/AllCourse');

            } catch (err) {
                if (err.name === 'SequelizeValidationError' || err.name === "error_multer") {
                    let errors = err.errors.map(el => el.message);
                    return res.redirect(`/addCourse?errors=${errors}`)
                } else {
                    console.error(err);
                    res.send(err);
                }
            }
        });
    }
    static async editCourse(req, res) {
        try {
            let { id } = req.params
            let { errors } = req.query
            let data = await Course.findOne({
                where: { id }
            })
            let category = await Category.findAll();
            // res.send(data)
            res.render('EditFormCourse', { data, category, errors })
        } catch (error) {
            res.send(error.message)
        }
    }
    static async postEditForm(req, res) {
        upload(req, res, async(err) => {
            const { id } = req.params
            try {
                // res.send(req.body)
                let data = await Category.findAll();
                if (err) {
                    throw err
                        // console.error('Multer error:', err);
                        // return res.render('AddCourse', {
                        //     msg: err,
                        //     data
                        // });
                }

                if (!req.file) {
                    throw {
                        name: "error_multer",
                        errors: [{
                            message: 'No file selected!'
                        }],
                        data
                    }
                    // console.log('No file uploaded');
                    // return res.render('AddCourse', {
                    //     msg: 'No file selected!',
                    //     data
                    // });
                }

                const { name, description, duration, categoryId } = req.body;
                // console.log(name)
                let imgUrl = req.file.filename;
                // console.log('Request body:', req.body);
                let temp = imgUrl;
                imgUrl = '../uploads/' + temp;

                await Course.update({
                    name,
                    description,
                    imgUrl,
                    duration,
                    categoryId
                }, {
                    where: { id }
                });

                console.log('successfully created');
                res.redirect('/AllCourse');

            } catch (err) {
                if (err.name === 'SequelizeValidationError' || err.name === 'error_multer') {
                    let errors = err.errors.map(el => el.message);
                    return res.redirect(`/editCourse/${id}?errors=${errors}`)
                }
                console.error(err);
                res.send(err);
            }
        });
    }

    static async deleteCourse(req, res) {
        try {
            const { id } = req.params
            await Course.destroy({
                where: {
                    id: id
                },
            })
            res.redirect(`/allCourse?deleted=berhasil delete course dengan id ${id}`)
        } catch (error) {

        }

    }
}

module.exports = CourseController