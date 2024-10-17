const router = require('express').Router();
const { verifyJWT } = require('../utils/verifyJWT');
const {
    signUpUser,
    signInUser,
    getAllUsers,
    updateUserStatus,
} = require('../controllers/userController');

router.route('/signUp-user').post(signUpUser);
router.route('/signIn-user').post(signInUser);
router.route('/getAllUsers').get(verifyJWT, getAllUsers);
router.route('/updateUserStatus').put(verifyJWT, updateUserStatus);

module.exports = router;
