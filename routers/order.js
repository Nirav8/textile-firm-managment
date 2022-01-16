const express = require("express");

const router = express.Router();
const order = require("../models/orders");

router.post("/addOrder", (req, res) => {
    try {
        const Order = new order({
            user: req.body.user,
            quantity: req.body.quantity,
            itemInfo: req.body.itemInfo
        });

        Order.save()
            .then(result => {
                res.status(200).json({
                    message: "Order is Created",
                    value: result
                })
            })
            .catch(err => {

                res.status(405).json({ message: err.message })
            })
    }
    catch {
        res.status(500).json({ message: "internal server error" })
    }
});


//update delivery
router.put("/updateDelivery", (req, res) => {

})



module.exports = router;