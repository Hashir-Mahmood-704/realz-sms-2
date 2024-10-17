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
        return res.status(200).json({ message: 'Twilio call sent successfully', success: true });
    } catch (error) {
        console.error('Error in sending twilio call');
        errorHandler(error, res);
    }
}

async function fetchUserTwilioCallsRecord(req, res) {
    try {
        if (req.userData.role !== 'admin') {
            throw makeErrorObject('Only admins are allowd to access this route');
        }
        const { userId } = req.body;
        if (!userId) throw makeErrorObject('User Id is required', 400);
        const userData = await User.findById(userId);
        if (!userData) throw makeErrorObject('User does not exsists');
        const { twilioSid, twilioToken } = userData._doc;
        if (!twilioSid) {
            return res
                .status(200)
                .json({ message: 'User has no twilio credentials', success: true, data: [] });
        }
        const client = require('twilio')(twilioSid, twilioToken);
        const callsRecord = await client.calls.list();
        const callRecordArrayToSend = callsRecord.map((item) => {
            return {
                sid: item.sid,
                dateCreated: new Date(item.dateCreated).toDateString(),
                to: item.to,
                from: item.from,
                status: item.status,
                duration: item.duration,
            };
        });
        return res.status(200).json({
            message: 'User twilio call records fetched successfully',
            success: true,
            data: callRecordArrayToSend,
        });
    } catch (error) {
        console.error('Error in fetching user twilio call records');
        errorHandler(error, res);
    }
}

async function getAllCallsRecords(req, res) {
    try {
        if (req.userData.role !== 'admin') {
            throw makeErrorObject('Only admins are allowd to access this route');
        }
        const promisesArray = [];
        const allUsers = await User.find();
        for (let i = 0; i < allUsers.length; i++) {
            const { twilioSid, twilioToken } = allUsers[i]._doc;
            if (!twilioSid) continue;
            const client = require('twilio')(twilioSid, twilioToken);
            promisesArray.push(client.calls.list());
        }
        const callsData = (await Promise.all(promisesArray)).flat();
        const totalCallsMade = callsData.length;
        let completedCalls = 0,
            canceledCalls = 0,
            queuedCalls = 0,
            failedCalls = 0,
            notAnswered = 0;
        for (let i = 0; i < callsData.length; i++) {
            if (callsData[i].status === 'completed') completedCalls++;
            else if (callsData[i].status === 'canceled') canceledCalls++;
            else if (callsData[i].status === 'failed') failedCalls++;
            else if (callsData[i].status === 'queued') queuedCalls++;
            else if (callsData[i].status === 'no-answer') notAnswered++;
        }
        return res.status(200).json({
            message: 'User twilio call records for all users fetched successfully',
            success: true,
            data: {
                totalCallsMade,
                completedCalls,
                failedCalls,
                canceledCalls,
                queuedCalls,
                notAnswered,
            },
        });
    } catch (error) {
        console.error('Error in fetching all twilio calls records');
        errorHandler(error, res);
    }
}

async function updateUserTwilioCredentials(req, res) {
    try {
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

module.exports = {
    sendCall,
    updateUserTwilioCredentials,
    fetchUserTwilioCallsRecord,
    getAllCallsRecords,
};
