const mongoose = require('mongoose');

const user = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return v.toString().length == 10 ? true : false;
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    password: {
        type: String,
        require: true
    },
    firms: {
        type: mongoose.Types.ObjectId,
        ref: "firm"
    },
    verified: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true })

module.exports = mongoose.model("user", user);