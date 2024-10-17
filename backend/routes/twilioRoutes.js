const router = require('express').Router();
const {
    sendCall,
    updateUserTwilioCredentials,
    fetchUserTwilioCallsRecord,
    getAllCallsRecords,
} = require('../controllers/twilioController');
const { verifyJWT } = require('../utils/verifyJWT');

router.route('/send-call').post(verifyJWT, sendCall);
router.route('/update-credentials').post(verifyJWT, updateUserTwilioCredentials);
router.route('/get-user-calls-records').post(verifyJWT, fetchUserTwilioCallsRecord);
router.route('/get-all-calls-record').get(verifyJWT, getAllCallsRecords);

module.exports = router;
