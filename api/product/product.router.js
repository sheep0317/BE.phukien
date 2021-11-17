const router = require("express").Router()
const { getProductById, getAllProduct } = require("./product.controller")



router.get("/", getAllProduct)
router.get("/:id", getProductById)
module.exports = router