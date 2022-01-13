const mongoose = require('mongoose');

const user = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    firms: [{
        type: mongoose.Types.ObjectId,
        ref: "firm"
    }],
    verified: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true })

module.exports = mongoose.model("user", user);