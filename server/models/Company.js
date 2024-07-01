const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompanySchema = new Schema({
    
    name: {
        type: String,
        requried: true,
    },

    address: {
        type: String,
        requried: false
    }, 
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },

    website: {
        type: String,
        required: false

    },
    numberEmp: {
        type: Number,
        required: false

    }, 
    numberEmp: {
        type: Number,
        required: false

    }, 

    founded: {
        type: Date,
        required: false,
    },

    industry: {
        type: String,
        enum: ["Technology", "Finance", "Healthcare", "Retail", "Other"],
        required: true,
    },



});



module.exports = mongoose.model('Company', CompanySchema)