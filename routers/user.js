const express = require("express");
const users = require("../models/users");
const router = express.Router();
const bcrypt = require("bcrypt");

//signup users
router.post("/signup", (req, res) => {
    try {
        const password = req.body.password //TODO encrypt and then save then password
        const User = users({
            name: req.body.name,
            mobile: req.body.mobile,
            password: password
        })

        User.save()
            .then(result => {
                res.status(200).json({
                    message: "User created Sucssesfully",
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
        const name = req.body.name;
        const password = req.body.password; //TODO incrypt and check before login for password

        users.findOne({ $and: [{ name: name }, { password: password }] })
            .then(result => {
                if (result) {
                    res.status(200).json({
                        message: "login succsessfull",
                        session: "implement soon" //TODO implement sesssion
                    })
                }
                else {
                    res.status(403).json({
                        message: "Invalid username or password!!"
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
            message: "internal server error"
        })
    }
})


module.exports = router;