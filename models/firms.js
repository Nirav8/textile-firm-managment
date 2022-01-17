// timestamp ,
// mobileno,
// name,
// createdby
// join

const mongoose = require('mongoose');

const firm = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    //TODO
    //! when will second user will join
    joinBy: {
        type: mongoose.Types.ObjectId
    },
}, { timestamps: true });

module.exports = mongoose.model("firm", firm)