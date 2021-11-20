const { getAllProduct, 
        getProductById,
        addProduct,
        deleteProduct,
        updateProduct 
    } = require('./product.service')

module.exports = {
    getAllProduct: (req, res) => {
        getAllProduct(
            (err, results) => {
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                console.log(results)
                return res.status(200).json({
                    data: results
                })
            }
        )
            
    },
    getProductById: (req, res) => {
        const id = req.params.id
        var returnResult;
        getProductById(id, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error/ product"
                })
            }
            if (!result) {
                return res.status(404).json({
                    success: 0,
                    message: "Product not found"
                })
            }
            return res.status(200).json({
                data: result,
                message: "Product found"
            })
        })
    },
    addProduct: (req, res) => {
        const data = req.body
        addProduct(data, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error/ product"
                })
            }
            if (!result) {
                return res.status(404).json({
                    success: 0,
                    message: "Product add Fail"
                })
            }
            return res.status(200).json({
                data: result,
                message: "Product added"
            })
        })
    },
    deleteProduct: (req, res) => {
        deleteProduct(req.params.id, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error/ product"
                })
            }
            if (!result) {
                return res.status(404).json({
                    success: 0,
                    message: "Product delete Fail"
                })
            }
            return res.status(200).json({
                data: result,
                message: "Product deleted"
            })
        })
    },
    updateProduct: (req, res) => {
        const data = req.body
        const id = req.params.id
        updateProduct(id, data, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error/ product"
                })
            }
            if (!result) {
                return res.status(404).json({
                    success: 0,
                    message: "Product update Fail"
                })
            }
            return res.status(200).json({
                data: result,
                message: "Product updated"
            })
        })
    }


}