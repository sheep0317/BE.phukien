const { create,
     getUserByEmail,
      getAllUsers, 
      deleteUser, 
      updateUser, 
      updatePassword} 
= require("./user.service")
require("dotenv").config()
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const {sign, verify} = require('jsonwebtoken');
module.exports = {
    userRegister: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        create(body, (err, results) => {
            if (err) {
                if (err.errno == 1062) {
                    return res.status(400).json({
                        success: 0,
                        message: "Email already exists"
                    })
                }
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
            })
        })
    },
    getUserByEmail: (req, res) => {
        const email = req.body.email
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
    getAllUsers: (req, res) => {
        getAllUsers((err, results) => {
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
            console.log(results)
            const token = sign({email: results.email, role: results.role}, process.env.SECRET_KEY, { expiresIn: '1h' })
            return res.status(200).json({
                success: 1,
                message: "Login success",
                token: token,
                role: results.role,
                displayName: results.displayname
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
            updatePassword(body, (err, results) => {
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
            const SECRET_KEY = 'thisIsResetPassword'
            const payload = {
                email: results.email,
            }
            const FEdomain = `http://localhost:4200/reset-password`
            const token = sign(payload, SECRET_KEY, { expiresIn: '15m' })
            const link = FEdomain + `/${token}`
            console.log(link)
            return res.status(200).json({
                success: 1,
                message: "Reset password link sent",
            })
        })   
    },
    resetPassword: (req, res) => {
        const body = req.body;
        let token = body.token
        const SECRET_KEY = 'thisIsResetPassword'
        verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    success: 0,
                    message: "Invalid token"
                })
            }
            body.email = decoded.email
            const salt = genSaltSync(10)
            body.password = hashSync(body.password, salt)
            updatePassword(body, (err, results) => {
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

    }
    
}