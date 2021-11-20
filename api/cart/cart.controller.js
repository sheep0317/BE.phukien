const { 
    getCart,
    addToCart,
    deleteCart,
    updateCart
} = require('./cart.service')

const {
    getProductById,
} = require('../product/product.service')

module.exports = {
    getCart: (req, res) => {
        const email = req.params.email
        var cart = {
            user_email: email,
            cart: [
            ]
        }
        getCart (email, (err, results) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error"
                })
            } else {
                console.log(results)
                if (results.length) {
                    results.forEach(element => {
                        getProductById(element.product_id, (err, result) => {
                            if (err) {
                                res.status(500).send({
                                    message: "Internal server error"
                                })
                            } else {
                                cart.cart.push({
                                    product_id: element.product_id,
                                    product_quantity: element.quantity,
                                    product_name: result.product_name,
                                })
                                if (cart.cart.length === results.length) {
                                    res.status(200).send(cart)
                                }
                            }
                        })
                    })
                } else {
                    res.send({
                        status: 204,
                        message: "No content"
                    })
                }
            }
        })
    },
    addToCart: (req, res) => {
        const data = req.body
        getProductById(data.product_id, (err, product) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error"
                })
            } else {
                if (product) {
                    if(product.product_quantity  >= data.product_quantity) {
                       addToCart(data, (err, results) => {
                            if (err) {
                                if (err.errno == 1062) {
                                    res.status(409).send({
                                        message: "Product already in cart"
                                    })
                                } else {
                                    res.status(500).send({
                                        message: "Internal server error"
                                    })
                                }
                            } else {
                                res.send({
                                    status: 200,
                                    message: "Product added to cart"
                                })
                            }
                        })
                    } else {
                        res.send({
                            status: 400,
                            message: "Product not available"
                        })
                    }
                } else {
                    res.send({
                        status: 404,
                        message: "Product not found"
                    })
                }
            }
        })
    },
    deleteCart: (req, res) => {
        const data = req.body
        deleteCart(data, (err, results) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error"
                })
            } else {
                res.send({
                    status: 200,
                    message: "Product deleted from cart"
                })
            }
        })
    },
    updateCart: (req, res) => {
        const data = req.body
        getProductById(data.product_id, (err, product) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error / get product"
                })
            } else {
                if (product) {
                    if(product.product_quantity  >= data.product_quantity) {
                        updateCart(data, (err, results) => {
                            if (err) {
                                res.status(500).send({
                                    message: "Internal server error / update"
                                })
                            } else {
                                res.send({
                                    status: 200,
                                    message: "Product quantity updated"
                                })
                            }
                        })
                    } else {
                        res.send({
                            status: 400,
                            message: "Product not available"
                        })
                    }
                } else {
                    res.send({
                        status: 404,
                        message: "Product not found"
                    })
                }
            }
        })
    },
    
}
