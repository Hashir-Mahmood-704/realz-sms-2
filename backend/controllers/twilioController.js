const { errorHandler, makeErrorObject } = require('../utils/handleError');
const User = require('../models/userModel');

async function sendCall(req, res) {
    try {
        const { twilioSid, twilioToken, twilioNumber, receiverNumber } = req.body;
        if (!twilioSid || !twilioToken || !twilioNumber || !receiverNumber) {
            throw makeErrorObject('All fields required', 400);
        }
        const client = require('twilio')(twilioSid, twilioToken);
        const callOptions = {
            from: twilioNumber,
            to: receiverNumber,
            twiml: `<Response><Say>Hello, this is a call from twilio</Say></Response>`,
        };
        const callResponse = await client.calls.create(callOptions);
        console.log('call response: ', callResponse);
        return res.status(200).json({ message: 'Twilio call sent successfully', success: true });
    } catch (error) {
        console.error('Error in sending twilio call');
        errorHandler(error, res);
    }
}

async function fetchTwilioCallRecords(req, res) {
    try {
        if (req.userData.role !== 'admin') {
            throw makeErrorObject('Only admins are allowd to access this route');
        }
        const { twilioSid, twilioToken } = req.body;
        if (!twilioSid || !twilioToken) {
            throw makeErrorObject('All fields required', 400);
        }
        const client = require('twilio')(twilioSid, twilioToken);
        const callsRecord = await client.calls.list();
        console.log('Calls records: ', callsRecord);
        return res
            .status(200)
            .json({ message: 'Twilio call records fetched successfully', success: true });
    } catch (error) {
        console.error('Error in fetching twilio call records');
        errorHandler(error, res);
    }
}

async function updateUserTwilioCredentials(req, res) {
    try {
        console.log(req.body);
        const { userId, twilioSid, twilioToken, twilioNumber } = req.body;
        if (!userId || !twilioSid || !twilioToken || !twilioNumber) {
            throw makeErrorObject('All fields required', 400);
        }
        const userExists = await User.findById(userId);
        if (!userExists) throw makeErrorObject('User does not exists', 404);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                twilioNumber,
                twilioSid,
                twilioToken,
            },
            { new: true, runValidators: true }
        );
        console.log('updated user: ', updatedUser);
        return res.status(201).json({
            message: 'User twilio credentails updated successfully',
            success: true,
            data: updatedUser._doc,
        });
    } catch (error) {
        console.error('Error in updating user twilio credentails');
        errorHandler(error, res);
    }
}

module.exports = { sendCall, fetchTwilioCallRecords, updateUserTwilioCredentials };
