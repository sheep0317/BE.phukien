const { create,
     getUserByEmail,
      getUsers, 
      deleteUser, 
      updateUser, 
      changePassword} 
= require("./user.service")
require("dotenv").config()
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const {sign} = require('jsonwebtoken');
module.exports = {
    userRegister: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        create(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getUserByEmail: (req, res) => {
        const email = req.params.email
        getUserByEmail(email, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    deleteUser: (req, res) => {
        const body = req.body
        deleteUser(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    updateUser: (req, res) => {
        const body = req.body
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                })
            }
            if (!compareSync(body.password, results.password)) {
                return res.status(404).json({
                    success: 0,
                    message: "Wrong password"
                })
            }
            const token = sign({role: results.role}, process.env.SECRET_KEY, { expiresIn: '1h' })
            return res.status(200).json({
                success: 1,
                message: "Login success",
                token: token
            })
        })
    },
    changePassword: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                })
            }
            if (!compareSync(body.oldPassword, results.password)) {
                return res.status(404).json({
                    success: 0,
                    message: "Wrong password"
                })
            }
            const salt = genSaltSync(10)
            body.password = hashSync(body.password, salt)
            updateUser(body, (err, results) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Password changed"
                })
            })
        })
    },
    //not done?????
    forgetPassword: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                })
            }
            const SECRET_KEY = process.env.SECRET_KEY + results.password
            const payload = {
                email: results.email,
            }
            const token = sign(payload, SECRET_KEY, { expiresIn: '15m' })
            const link = `http://localhost:3000/reset-password/${token}`
            console.log(link)
            return res.status(200).json({
                success: 1,
                message: "Reset password link sent",
            })
        })   
    }
    
}