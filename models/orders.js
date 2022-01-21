const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');

const { message } = require("../constant");

const order = mongoose.Schema({
    firm: {
        type: mongoose.Types.ObjectId,
        ref: "firm"
    },
    quantity: {
        type: Number,
        required: [true, message.order_quantity_require],
    },
    itemInfo: {
        imageURl: { type: String },
        detail: { type: String },
        price: { type: Number }
    },
    forward_info: {
        forward_item: {
            type: Number,
            default: 0,
        },
        info: [{
            date: {
                type: Date,
                default: Date.now()
            },
            user_id: {
                type: mongoose.Types.ObjectId,
                ref: "user",
            },
            quantity: {
                type: Number,
            }
        }]
    },
    delivery_info: {
        delivery_item: {
            type: Number,
            default: 0,
        },
        info: [{
            date: {
                type: Date,
                default: Date.now()
            },
            user_id: {
                type: mongoose.Types.ObjectId,
                ref: "user",
            },
            quantity: {
                type: Number,
            }
        }]
    },
}, { timestamps: true })

order.plugin(idValidator);

//learnong
// function validation() {
//     console.log(this)
//     console.log(" abe ye to abhi bhi work kar raha hai")
// }


// order.pre("save", function (next) {
//     console.log("called (((((((((((((((((((((((((");
//     // console.log(this)
//     next();
// })

// order.pre("validate", function (next) {
//     console.log("called (((((((((((((((((((((((((");
//     console.log(this)
//     next();
// })

// order.pre("updateOne", function (next) {
//     console.log("called, **************2")
//     console.log(this.model)
//     next();
// })



module.exports = mongoose.model("order", order);