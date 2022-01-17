const express = require("express");

const router = express.Router();
const order = require("../models/orders");

router.post("/addOrder", (req, res) => {
    try {
        const Order = new order({
            firm: req.body.firm,
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
        const user_id = req.body.user_id;
        const order_id = req.body.order_id

        order.updateOne({ _id: order_id }, { $push: { forward: user_id } })
            .then(result => {
                if (result.modifiedCount >= 1) {
                    res.status(200).json({
                        message: "order_forwarded Succsess"
                    })
                }
                else {
                    res.status(201).json({
                        message: result
                    })
                }
            })
            .catch(err => {
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
router.put("/delivery_status", (req, res)=>{
        const order_id = req.body.order_id;
        const status = req.body.status;
        order.findById({_id: order_id})
        .then(result=>{
            let temp_q = 0;
            //! all redy deliverd items quantitiy
            result.deliveryStatus.forEach(element => {
                temp_q += element.DQ
            });
            //! add new quantity that will added in status
            temp_q += status.DQ
            //! validate quantity
            if(temp_q <= result.quantity ){
                order.updateOne({_id: order_id}, {$push: {deliveryStatus: status}}, { runValidators: true })
                .then(
                    res.status(200).json({
                    message: "delivery quantity is updated succsessfull;y"
                }))
                .catch(err=>{
                    res.status(401).json({
                        message: err
                    })
                })
            }
            else{
                res.status(401).json({
                    message: "quantity is excied from order quantity please enter valid quantity"
                })
            }
            
        })
        .catch(err =>{
            res.status(400).json({
                message: err
            })
        })
})



module.exports = router;