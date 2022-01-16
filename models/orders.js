const mongoose = require("mongoose");
require("mongoose-type-url");
const user = require("./users");

const order = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        validate: {
            validator: function (v) {
                return user.exists({ _id: v });
            },
            message: `invalid userID or User is not available`
        }
    },
    quantity: {
        type: Number,
        required: true
    },
    deliveryStatus: [{
        DQ: { type: Number }, //delivered quantity
        date: { type: Date }
    }, { timeStamps: true }],
    itemInfo: [{
        imageURl: {
            type: mongoose.SchemaTypes.Url,
        },
        Quantity: { type: Number },
        price: { type: Number }
    }],
}, { timeStamps: true });


module.exports = mongoose.model("order", order);