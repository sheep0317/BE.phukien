const router = require("express").Router()
const {getAllProduct} = require("./product.service")

router.get("/", getAllProduct)

module.exports = router