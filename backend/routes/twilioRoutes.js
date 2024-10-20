const router = require('express').Router();
const {
    fetchUserTwilioCallsRecord,
    getAllCallsRecords,
    createCampaign,
    getTwilioNumbers,
    gatherResponse,
    updateUserTwilioCredentials,
} = require('../controllers/twilioController');
const { verifyJWT } = require('../utils/verifyJWT');
const upload = require('../middleware/multer');

// for user
router.route('/create-campaign').post(upload.single('file'), createCampaign);
router.route('/get-twilio-numbers').post(getTwilioNumbers);
router.route('/gather-response').post(gatherResponse);

// for admin use
router.route('/get-user-calls-records').post(verifyJWT, fetchUserTwilioCallsRecord);
router.route('/get-all-calls-record').get(verifyJWT, getAllCallsRecords);
router.route('/update-credentials').post(verifyJWT, updateUserTwilioCredentials);

module.exports = router;

// router.route('/send-call').post(verifyJWT, sendCall);
