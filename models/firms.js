const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const firm = mongoose.Schema({
    user1: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    user2: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "order"
    }]
}, { timestamps: true });

firm.plugin(idValidator);

module.exports = mongoose.model("firm", firm)