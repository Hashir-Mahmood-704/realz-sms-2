const { errorHandler, makeErrorObject } = require('../utils/handleError');
const User = require('../models/userModel');
const fsPromise = require('fs/promises');

async function createCampaign(req, res) {
    try {
        
        if (!req.file) throw makeErrorObject('File not found', 400);
        const { campaignName, twilioSid, twilioToken, twilioNumber, callText, transferCallNumber } = req.body;
        if (!campaignName || !twilioSid || !twilioToken || !twilioNumber || !callText || !transferCallNumber) {
            throw makeErrorObject('All fields required', 400);
        }
        console.log("request file path", req.file.path);
        
        const fileData = await fsPromise.readFile(req.file.path, 'utf-8');
        const fileDataInArray = fileData.split('\n').map((item) => item.trim());
        const client = require('twilio')(twilioSid, twilioToken);
        const callPromises = fileDataInArray.map((number) => {
            const callOptions = {
                from: twilioNumber,
                to: number,
                twiml: `<Response>
                    <Gather numDigits="1" action="/api/twilio/gather-response?transferCallNumber=${transferCallNumber}" method="POST">
                        <Say>${callText}</Say>
                    </Gather>
                </Response>`
            };
            return client.calls.create(callOptions);
        });
        const callsResponse = await Promise.all(callPromises);
        console.log(callsResponse);
        return res.status(200).json({ message: 'Calls send successfully', success: true });
    } catch (error) {
        console.error('Error in creating new campaign');
        errorHandler(error, res);
    }
}

async function gatherResponse(req, res) {
    try {
        const { Digits } = req.body;
        const transferCallNumber = req.query.transferCallNumber;
        console.log('digit pressed: ', Digits);
        console.log('transfer number: ', transferCallNumber);
        const twiml = new twilio.twiml.VoiceResponse();
        // if (Digits === '1') {
        //     // If '1' is pressed, transfer the call to the specified number
        //     twiml.say('Transferring your call now.');
        //     // twiml.dial(transferCallNumber); // Transfer the call
        // } else {
        //     // If another key is pressed, give feedback
        //     twiml.say(`You pressed ${Digits}. This option is not available. Goodbye!`);
        // }
        res.type('text/xml');
        res.send(twiml.toString());
    } catch (error) {
        console.error('Error in transfring calls');
        errorHandler(error, res);
    }
}

async function getTwilioNumbers(req, res) {
    try {
        const { twilioSid, twilioToken } = req.body;
        if (!twilioSid || !twilioToken) throw makeErrorObject('All fields are required', 400);
        const client = require('twilio')(twilioSid, twilioToken);
        const incomingPhoneNumbers = (await client.incomingPhoneNumbers.list()).map((number) => {
            return {
                phoneNumber: number.phoneNumber
            };
        });
        return res
            .status(200)
            .json({ message: 'Twilio phone numbers fetched successfully', success: true, data: incomingPhoneNumbers });
    } catch (error) {
        console.error('Error in getting new campaign');
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
            return res.status(200).json({ message: 'User has no twilio credentials', success: true, data: [] });
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
                duration: item.duration
            };
        });
        return res.status(200).json({
            message: 'User twilio call records fetched successfully',
            success: true,
            data: callRecordArrayToSend
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
                notAnswered
            }
        });
    } catch (error) {
        console.error('Error in fetching all twilio calls records');
        errorHandler(error, res);
    }
}

//
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
                twilioToken
            },
            { new: true, runValidators: true }
        );
        return res.status(201).json({
            message: 'User twilio credentails updated successfully',
            success: true,
            data: updatedUser._doc
        });
    } catch (error) {
        console.error('Error in updating user twilio credentails');
        errorHandler(error, res);
    }
 }

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
            twiml: `<Response><Say>Hello, this is a call from twilio</Say></Response>`
        };
        const callResponse = await client.calls.create(callOptions);
        return res.status(200).json({ message: 'Twilio call sent successfully', success: true });
    } catch (error) {
        console.error('Error in sending twilio call');
        errorHandler(error, res);
    }
}

module.exports = {
    createCampaign,
    fetchUserTwilioCallsRecord,
    getAllCallsRecords,
    getTwilioNumbers,
    gatherResponse,
    updateUserTwilioCredentials
};

