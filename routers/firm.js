const express = require('express');

const firm = require("../models/firms");

const router = express.Router();


router.post("/addFirm", (req, res) => {
    try {
        const Firm = new firm(req.body)

        Firm.save()
            .then(result => {
                res.status(200).json({
                    message: "Firm created Sucssesfully",
                    value: result
                })
            })
            .catch(err => {
                if (err.code == 11000) {
                    res.status(400).json({
                        message: `Firm name ${err.keyValue.name} is allredy awailable`
                    })
                }
                else if (err._message) {
                    res.status(501).json({
                        message: err
                    })
                }
                else {
                    res.status(400).json({
                        value: err
                    })
                }
            })
    } catch {
        res.status(500).json({
            message: "internal server"
        })
    }
})


module.exports = router;    