const { getAllProduct, 
        getProductImageById, 
        getProductById 
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
    }
}