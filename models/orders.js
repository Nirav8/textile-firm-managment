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
            type: mongoose.SchemaTypes.Url,
        },
        detail: { type: String },
        price: { type: Number }
    },
    // forward_info: [{
    //     forward: {
    //         type: mongoose.Types.ObjectId,
    //         validator: function (v) {
    //             return user.exists({ _id: v });
    //         },
    //         message: `invalid userID or User is not available`
    //     },
    //     status: {
    //         type: string,
    //         default: "pendding"
    //     }
    // }]
    forward: {
        type: mongoose.Types.ObjectId,
        validator: function (v) {
            return user.exists({ _id: v });
        },
        message: `invalid userID or User is not available`
    },
    deliveryStatus: [{
        DQ: { type: Number },
        date: { type: Date }
    }],

}, { timeStamps: true });


module.exports = mongoose.model("order", order);