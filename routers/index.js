const express = require('express');
const CourseController = require('../controllers/courseController');
const UserController = require('../controllers/userControllers');
const ProfileController = require('../controllers/profileController');
const router = express.Router()




router.get('/login', UserController.showLoginForm)
router.post('/login', UserController.postLoginForm)
router.get('/register', UserController.getRegisterForm)
router.post('/register', UserController.postRegisterForm)
router.get('/logout', UserController.postLogout)

router.use(function(req, res, next) {
    if (!req.session.userId) {
        const error = 'need to login first'
        res.redirect(`/login?error=${error}`);
    } else {
        next()
    }
})

router.get('/getMyCourse', UserController.getMyCourse)

// router.use(function(req, res, next) {
//     if (!req.session.userid && req.session.role !== 'admin') {
//         const error = 'you have no acces'
//         res.redirect(`/login?error=${error}`)
//     } else {
//         next()
//     }
// })

router.get('/', CourseController.home)
router.get('/allCourse', CourseController.getAllCourse)
router.get('/addCourse', CourseController.addCourse)
router.post('/postAddCourse', CourseController.postAddCourse)
router.get('/editCourse/:id', CourseController.editCourse)
router.get('editCourse/:id', CourseController.postEditForm);
router.get('/delete/:id', CourseController.deleteCourse)
router.get('/getProfile', ProfileController.getProfile)



module.exports = router;