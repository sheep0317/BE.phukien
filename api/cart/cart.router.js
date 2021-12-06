const router = require("express").Router()
const { getCart,
        addToCart,
        deleteCart,
        updateCart,
    } = require("./cart.controller")
const { checkTokenUser, checkToken }= require('./../../authentication/token_validation')

router.post("/getCart",checkToken, getCart)
router.post("/", checkToken, addToCart)
router.post("/delete", checkToken, deleteCart)
router.post("/update", checkTokenUser, updateCart)

module.exports = router