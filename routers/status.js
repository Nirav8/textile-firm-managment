const express = require("express");

const router = express.Router();

const status = require("../models/status");

router.post("/forword/:userid", (req, res) => {
    try {
        const Status = new status({

        })
    } catch {
        res.status(500).json({
            "message": "internal server Error"
        })
    }
})