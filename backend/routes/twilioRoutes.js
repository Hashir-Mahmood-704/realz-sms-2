const router = require('express').Router();
const {
    sendCall,
    fetchTwilioCallRecords,
    updateUserTwilioCredentials,
} = require('../controllers/twilioController');
const { verifyJWT } = require('../utils/verifyJWT');

router.route('/send-call').post(verifyJWT, sendCall);
router.route('/get-calls-record').post(verifyJWT, fetchTwilioCallRecords);
router.route('/update-credentials').post(verifyJWT, updateUserTwilioCredentials);

module.exports = router;
