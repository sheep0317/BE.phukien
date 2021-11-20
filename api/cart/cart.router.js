const router = require("express").Router()
const { getCart,
        addToCart,
        deleteCart,
        updateCart
    } = require("./cart.controller")

router.get("/:email", getCart)
router.post("/", addToCart)
router.delete("/", deleteCart)
router.put("/", updateCart)

module.exports = router