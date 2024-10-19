const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
    {
        campaignName: {
            type: String,
            required: true,
            trim: true
        },
        twilioSid: {
            type: String,
            required: true
        },
        twilioToken: {
            type: String,
            required: true
        },
        twilioNumber: {
            type: String,
            required: true
        },
        callText: {
            type: String,
            required: true
        },
        transferCallNumber: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
