const express = require("express");

const router = express.Router();
const order = require("../models/orders");

const base_url = require("../constant.js")
const multer = require("multer");

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
        cb(null, './uploads');
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
    try {
        const item_info = {
            detail: req.body.detail,
            price: req.body.price,
            imageURl: `${base_url}/${req.file.path}`
        }
        console.log(req.file.path)
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
                res.status(405).json({ message: err._message })
            })
    }
    catch {
        res.status(500).json({ message: "internal server error" })
    }
});

//forwar order
router.put("/forward_order", (req, res) => {
    try {
        const forward_info = req.body.forward_info;
        const order_id = req.body.order_id

        order.findById({ _id: order_id })
            .then(result => {
                if (result == null) {
                    res.status(401).json({
                        message: "order_id is not valid"
                    })
                }
                else {
                    let temp_q = 0;
                    //! allredy deliverd items quantitiy
                    result.forward_info.forEach(element => {
                        temp_q += element.quantity
                    });
                    //! add new quantity that will added in status
                    temp_q = forward_info.quantity + temp_q;
                    //! validate quantity
                    if (temp_q <= result.quantity) {
                        order.updateOne({ _id: order_id }, { $push: { forward_info: forward_info } }, { runValidators: true })
                            .then(result => {
                                res.status(200).json({
                                    message: "ordered forwarded succsessfully",
                                })
                            })
                            .catch(err => {
                                res.status(405).json({ message: err._message })
                            })
                    }
                    else {
                        res.status(401).json({
                            message: "quantity is excied from order quantity please enter valid quantity"
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    message: err
                })
            })
    } catch {
        res.status(500).json({
            message: "internal server"
        })
    }
})



//update delivery status
router.put("/delivery_status", (req, res) => {
    const order_id = req.body.order_id;
    const delivery_info = req.body.delivery_info;
    order.findById({ _id: order_id })
        .then(result => {
            if (result == null) {
                res.status(401).json({
                    message: "Invalid order_id"
                })
            }
            let temp_q = 0;
            //! allredy deliverd items quantitiy
            result.deliveryStatus.forEach(element => {
                temp_q += element.quantity
            });
            //! add new quantity that will added in status
            temp_q += delivery_info.quantity
            //! validate quantity
            if (temp_q <= result.quantity) {
                order.updateOne({ _id: order_id }, { $push: { deliveryStatus: delivery_info } }, { runValidators: true })
                    .then(result => {
                        res.status(200).json({
                            message: "delivery status is updated"
                        })
                    })
                    .catch(err => {
                        res.status(405).json({ message: err._message })
                    })
            }
            else {
                res.status(401).json({
                    message: "quantity is excied from order quantity please enter valid quantity"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                message: err
            })
        })
})



module.exports = router;