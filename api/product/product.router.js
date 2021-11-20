const router = require("express").Router()
const { getProductById, 
        getAllProduct, 
        addProduct, 
        deleteProduct, 
        updateProduct 
    } = require("./product.controller")



router.get("/", getAllProduct)
router.get("/:id", getProductById)
router.post("/add", addProduct)
router.delete("/delete/:id", deleteProduct)
router.put("/update/:id", updateProduct)
module.exports = router