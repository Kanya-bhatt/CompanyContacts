const { BatchType } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;
//notes: [{ type: Schema.Types.ObjectId, ref: 'noteModel' }]
const ContactSchema = new Schema({
    companyRef: {
        type: String,
        required: true
    },
    name: {
        type: String,
        requried: true,
    },


    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },

    website: {
        type: String,
        required: false

    },
    dob: {
        type: Date,
        required: false
    },

    type: {
        type: String,
        enum: ["Primary", "Secondary", "Other"],
        required: true,
    },




});



module.exports = mongoose.model('Contact', ContactSchema)