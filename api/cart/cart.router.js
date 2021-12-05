const router = require("express").Router()
const { getCart,
        addToCart,
        deleteCart,
        updateCart
    } = require("./cart.controller")
const { checkTokenUser }= require('./../../authentication/token_validation')

router.get("/",checkTokenUser, getCart)
router.post("/", checkTokenUser, addToCart)
router.delete("/", checkTokenUser, deleteCart)
router.put("/", checkTokenUser, updateCart)

module.exports = router