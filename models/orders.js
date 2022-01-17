const mongoose = require("mongoose");
require("mongoose-type-url");

const firm = require("./firms");
const user = require("./users");

const order = mongoose.Schema({
    firm: {
        type: mongoose.Types.ObjectId,
        validate: {
            validator: function (v) {
                return firm.exists({ _id: v });
            },
            message: `invalid firmID or Firm is not available`
        }
    },
    quantity: {
        type: Number,
        required: true
    },
    itemInfo: {
        imageURl: {
            type: String,
        },
        detail: { type: String },
        price: { type: Number }
    },
    forward_info: [{
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "users",
            validate: {
                validator: function (v) {
                    return user.exists({ _id: v });
                },
            },
            message: `invalid userID or User is not available`
        },
        quantity: {
            type: Number
        }
    }],
    deliveryStatus: [{
        user_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "users",
            validate: {
                validator: function (v) {
                    return user.exists({ _id: v });
                },
            },
            message: `invalid userID or User is not available`
        },
        quantity: { type: Number },
        date: { type: Date }
    }],
}, { timeStamps: true });


module.exports = mongoose.model("order", order);