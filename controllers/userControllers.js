const { Op } = require('sequelize')
const { User, UserCourse, Course, Profile } = require('../models')
var bcrypt = require('bcryptjs');
class UserController {
    static async showLoginForm(req, res) {
        try {
            const { error } = req.query
            res.render('Login', { error })
        } catch (error) {
            res.send(error.message)
        }
    }
    static async postLoginForm(req, res) {
        try {
            // console.log(req.session)
            const { email, password } = req.body
            let user = await User.findOne({
                    where: { email }
                })
                // console.log(user)
            if (user) {
                const isValid = bcrypt.compareSync(password, user.password)

                if (isValid) {
                    req.session.userId = user.id
                    req.session.role = user.role
                        // console.log(req.session)
                    return res.redirect('/allCourse')
                } else {
                    return res.redirect(`/login?error=invalid email/password`)
                }
            } else {
                return res.redirect(`/login?error=user not found`)
            }

        } catch (error) {
            res.send(error.message)
        }
    }
    static async getRegisterForm(req, res) {
        try {
            const { error } = req.query
            res.render('register', { error })
        } catch (error) {
            res.send(error.message)
        }
    }
    static async postRegisterForm(req, res) {
        try {
            const { email, password, role } = req.body
            let valid = await User.findOne({
                where: {
                    email: {
                        [Op.iLike]: `${email}`
                    }
                }
            })
            if (valid) {
                res.redirect(`/register?error=email ${email} sudah ada`)
            } else {

                let data = await User.create({ email, password, role })

                await Profile.create({
                    userId: data.id
                })

                if (data) {
                    req.session.userId = data.id
                    req.session.role = data.role
                    res.redirect('/allcourse')
                } else {
                    let error = 'registrasi belum berhasil'
                    res.redirect(`/register?error=${error}`)
                }
            }
        } catch (error) {
            res.send(error.message);
        }
    }
    static async postLogout(req, res) {
        req.session.destroy((err) => {
            if (err) console.log(err)
            else {
                res.redirect(`\login`)
            }
        })
    }
    static async getMyCourse(req, res) {
        try {
            // console.log(req.session)
            let userId = req.session.userId
                // console.log(userId)

            const data = await User.findByPk(userId, {
                include: [{
                    model: Course,
                    as: 'Courses'
                }, ],
            });
            // res.send(data)
            res.render('MyCourse', { data });
        } catch (error) {
            res.send(error.message);
        }
    }
}

module.exports = UserController