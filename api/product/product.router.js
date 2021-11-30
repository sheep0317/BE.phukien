const router = require("express").Router()
const { getProductById, 
        getAllProduct, 
        addProduct, 
        deleteProduct, 
        updateProduct 
    } = require("./product.controller")
const {checkTokenAdmin,
       checkTokenUser }= require('./../../authentication/token_validation')


router.get("/", getAllProduct)
router.get("/:id", getProductById)
router.post("/add", checkTokenAdmin, addProduct)
router.delete("/delete/:id",checkTokenAdmin, deleteProduct)
router.put("/update/:id",checkTokenAdmin, updateProduct)
module.exports = router