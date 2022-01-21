const express = require("express");

const router = express.Router();
const order = require("../models/orders");

const base_url = require("../constant.js")
const multer = require("multer");

const { responce_message, server_error } = require("../constant");

function filefilter(req, file, cb) {
    //TODO filter file type

    // (file.mimnetype === image/jpg || file.mimetype === image/jpg)
    if (true) {
        cb(null, true)
    }
    else {
        cb(new Error('file type is not valid type'), false)
    }
}

Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/item-images');
    },
    filename: (req, file, cb) => {
        cb(null, 'Item-Image' + file.originalname)
    },
    filefilter: filefilter
})

const upload = multer({
    fileFilter: filefilter,
    storage: Storage,
    //TODO comment is for limite
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // },
})


router.post("/addOrder", upload.single("itemImage"), (req, res) => {
    // try {

    const item_info = {
        detail: req.body.detail,
        price: req.body.price,
        imageURl: `${base_url}/${req.file.path}`
    }
    const Order = new order({
        firm: req.body.firm,
        quantity: req.body.quantity,
        itemInfo: item_info
    });
    Order.save()
        .then(result => {
            res.status(200).json({
                message: "Order is Created",
                value: result
            })
        })
        .catch(err => {
            res.status(405).json({ message: err })
        })
    // }
    // catch {
    //     res.status(500).json({ message: "internal server error" })
    // }
});

//forwar order
router.put("/forward_order", (req, res) => {
    try {
        order.findById({ _id: req.body.order_id })
            .then(result => {
                if (result.quantity >= result.forward_info.forward_item + req.body.forward_info.quantity) {
                    // console.log(typeof (result.quantity), typeof (result.forward_info.forward_item + req.body.forward_info.quantity))
                    order.updateOne(
                        { _id: req.body.order_id },
                        {
                            $push: { "forward_info.info": req.body.forward_info },
                            $inc: { "forward_info.forward_item": req.body.forward_info.quantity }
                        }, { runValidators: true })
                        .then(result => {
                            // result: {
                            //     acknowledged: true,
                            //     modifiedCount: 1,
                            //     upsertedId: null,
                            //     upsertedCount: 0,
                            //     matchedCount: 1
                            //   }
                            if (result.acknowledged === true && result.matchedCount === 1 || result.modifiedCount > 1) {
                                res.status(200).json({
                                    message: responce_message.order_forward_succsess
                                })
                            }
                            else {
                                res.status(301).json({
                                    message: responce_message.order_forward_fail
                                })
                            }
                        })
                        .catch(error => {
                            // const message = JSON.parse(err.message)
                            res.status(401).json({
                                message: "invalid user"
                            })
                        })
                }
                else {
                    console.log("calledelse")
                    res.status(401).json({
                        message: "Forward " + responce_message.order_is_more_than_quantity
                    })
                }
            })
            .catch(err => {
                res.status(402).json({
                    message: "Invalid order_id"
                })
            })
    }
    catch {
        res.status.json({
            message: server_error.internale_error
        })
    }
})



//update delivery status

router.put("/delivery_status", (req, res) => {
    try {
        order.findById({ _id: req.body.order_id })
            .then(result => {
                // console.log(result.quantity, result.delivery_info.delivery_item + req.body.delivery_info.quantity)
                if (result.quantity >= result.delivery_info.delivery_item + req.body.delivery_info.quantity) {
                    order.updateOne(
                        { _id: req.body.order_id },
                        {
                            $push: { "delivery_info.info": req.body.delivery_info },
                            $inc: { "delivery_info.delivery_item": req.body.delivery_info.quantity }
                        }, { runValidators: true })
                        .then(result => {
                            // result: {
                            //     acknowledged: true,
                            //     modifiedCount: 1,
                            //     upsertedId: null,
                            //     upsertedCount: 0,
                            //     matchedCount: 1
                            //   }
                            if (result.acknowledged === true && result.matchedCount === 1 || result.modifiedCount > 1) {
                                res.status(200).json({
                                    message: responce_message.delivery_forward_succsess,
                                    pandding_order: 0
                                })
                            }
                            else {
                                res.status(301).json({
                                    message: responce_message.delivery_forward_fail
                                })
                            }
                        })
                        .catch(error => {
                            // const message = JSON.parse(err.message)
                            res.status(401).json({
                                message: "invalid user"
                            })
                        })
                }
                else {
                    console.log("calledelse")
                    res.status(401).json({
                        message: "delivery " + responce_message.order_is_more_than_quantity
                    })
                }

            })
            .catch(err => {
                console.log(err)
                res.status(402).json({
                    message: "Invalid order_id"
                })
            })
    }
    catch {
        res.status.json({
            message: server_error.internale_error
        })
    }
})


//get all order by firm id
router.get("/getFirmOrder/:firm_id", (req, res) => {
    //get all order by firm_id
    //Order.find({})
    //TODO
})

//get all firm by userID
router.get("/getFirmbyID", (req, res) => {
    //eimplement for get all firms
    // Firm.find({_id:firm_id}).then
    //TODO

})

//get all Order in FIrm
router.get("/getOrder", (req, res) => {
    //TODO
    // Order.find({firm: firm_id})
})


//! get Order History with user_id

//get all order in forwarded by user_id
router.get("getFOrderbyUserId", (req, res) => {
    // order.find({ forward_info: { $eleMatch: {user_id: user_id} } })
    // .select()
})

//get all order in delivery by user_id
router.get("getDOrderbyUserId", (req, res) => {
    // order.find({ deliveryStatus: { $eleMatch: {user_id: user_id} } })
    // .select(//!only select only perticular ids )
})





module.exports = router;