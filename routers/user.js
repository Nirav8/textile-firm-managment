const express = require("express");
const users = require("../models/users");
const router = express.Router();
const bcrypt = require("bcrypt");
const s_key = require("../constant.js");

//signup users
router.post("/signup", (req, res) => {
    try {
        let password = bcrypt.hashSync(req.body.password, 10) //TODO encrypt and then save then password
        const User = users({
            name: req.body.name,
            mobile: req.body.mobile,
            password: password
        })

        User.save()
            .then(result => {
                res.status(200).json({
                    message: "User Created Sucssesfully",
                    session: "implement soon",//TODO
                    value: result
                })
            })
            .catch(err => {
                if (err.code == 11000) {
                    res.status(400).json({
                        message: `Mobile no ${err.keyValue.mobile} is allredy awailable`
                    })
                }
                else if (err.errors.mobile) {
                    res.status(400).json({
                        message: err.errors.mobile.message,
                        value: err
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


//login
//DONE
router.post("/login", (req, res) => {
    try {
        users.findOne({ name: req.body.name })
            .then(result => {
                if (result == null) {
                    res.json({ message: 'Invalid userId' })
                }
                bcrypt.compare(req.body.password, result.password, (error, result) => {
                    if (result) {
                        return res.status(200).json({
                            message: "login sucsessfull",
                            session: "implement soon" //TODO 
                        });
                    }
                    else {
                        return res.status(401).json({
                            message: 'Invalid userid or password'
                        });
                    }
                })

            })
            .catch(err => {
                res.status(400).json({
                    message: err
                })
            })
    } catch {
        res.status(500).json({
            message: "internal server error"
        })
    }
})


module.exports = router;
