const mongoose = require('mongoose');
const { message } = require("../constant");

const user = mongoose.Schema({
    name: {
        type: String,
        required: [true, message.name_require],
    },
    firm_name: {
        type: String,
        unique: [true, message.firm_name_unique]
    },
    mobile: {
        type: String,
        required: [true, message.mobile_require],
        minlength: [10, message.mobile_length],
        maxlength: [10, message.mobile_length],
        unique: true,

    },
    password: {
        type: String,
        require: true,
        minlength: [5, message.password_length],
        match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, message.password_validate], //TODO
    },
    verified: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true })

module.exports = mongoose.model("user", user);