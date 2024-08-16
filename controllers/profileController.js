const { User, Profile } = require('../models')
class ProfileController {
    static async getProfile(req, res) {
        try {
            let data = await User.findOne({
                where: {
                    id: req.session.userId
                },
                include: Profile
            });
            // res.send(data);
            res.render('ProfilePage', { data })
        } catch (error) {
            res.send(error.message)
        }
    }
}
module.exports = ProfileController