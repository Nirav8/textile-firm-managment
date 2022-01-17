const mongoose = require("mongoose");

const status = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        validate: [Uservalidate, "user can not be same."]
    },
    u_1: {
        type: mongoose.Types.ObjectId,
        validate: {
            validator: function (v) {
                return user.exists({ _id: v });
            },
            message: `invalid userID or User is not available`
        }
    },
    u_2: {
        type: mongoose.Types.ObjectId,
        validate: {
            validator: function (v) {
                return user.exists({ _id: v });
            },
            message: `invalid userID or User is not available`
        }
    },
    u_3: {
        type: mongoose.Types.ObjectId,
        validate: {
            validator: function (v) {
                return user.exists({ _id: v });
            },
            message: `invalid userID or User is not available`
        }
    },
    deliveryStatus: [{
        DQ: { type: Number }, //delivered quantity
        date: { type: Date }
    }, { timeStamps: true }],

});

function Uservalidate(value) {
    return this.u_1 === this.u_2 === this.u_3;
}

module.exports = mongoose.model("status", status);