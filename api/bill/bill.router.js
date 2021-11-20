const router = require("express").Router()

const { 
    createBill
} = require("./bill.controller")

router.post("/", createBill)

module.exports = router