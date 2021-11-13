const { getAllProduct } = require('./product.service')

module.exports = {
    getAllProduct: (req, res) => {
        getAllProduct()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}