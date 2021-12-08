const { 
    createBill,
    getNewBillId,
    getBillById,
    updateBill,
    getBillByCustomerEmail,
    deleteBill,
    getAllBillId,
    getStat
} = require('./bill.service')
const {clearCart} = require('../cart/cart.service')
const { updateProuctQuantity, getProductQuantity } = require('../product/product.service')
module.exports = {
    createBill: (req, res) => {
        const email = req.body.email
        const products = req.body.products
        const date = req.body.date
        getNewBillId((err, results) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error"
                })
            } else {
                const bill_id = results
                products.forEach(product => {
                    if (product != null) {
                        createBill(email, bill_id, product, date, (err, results) => {
                            if (err) {
                                res.status(500).json({
                                    message: "Error when creating bill",
                                    error: err
                                })
                            }
                        })
                        // get current product quantity
                        getProductQuantity(product.product_id.toString(), (err, results) => {
                            if (err) {
                                res.status(500).json({
                                    message: "Error when getting product quantity",
                                    error: err
                                })
                            } else {
                                var updatedQuantity = parseInt(results.product_quantity) - parseInt(product.product_quantity)
                                updateProuctQuantity(product.product_id, updatedQuantity, (err, results) => {
                                    if (err) {
                                        res.status(500).json({
                                            message: "Error when updating product quantity",
                                            error: err
                                        })
                                    }
                                })
                            }
                        })
                        
                    }
                })
                
                clearCart(email, (err, results) => {
                    if (err) {
                        res.status(500).json({
                            message: "Error when clearing cart",
                            error: err
                        })
                    }
                })
                res.status(200).json({
                    message: "Bill created successfully"
                })
            }
        })
    },
    getAllBill: (req, res) => {
        getAllBillId((err, results) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error"
                })
            } else {
                var allOfBill = [];
                results.forEach(result => {
                    getBillById(result.bill_id, (err, kq) => {
                        if (err) {
                            res.status(500).send({
                                message: "Internal server error"
                            })
                        } else {
                            console.log(kq)
                            var bill = {
                                id: kq[0].bill_id,
                                email: kq[0].email,
                                createDate: kq[0].create_date,
                                paidDate: kq[0].paid_date,
                                products: []
                            }
                            kq.forEach(element => {
                                bill.products.push({
                                    product_id: element.product_id,
                                    product_name: element.product_name,
                                    product_quantity: element.product_quantity,
                                    total: element.total
                                })
                            })
                            allOfBill.push(bill)
                        }
                        if (allOfBill.length == results.length) {
                            res.status(200).json({
                                message: "Get all bill successfully",
                                data: allOfBill
                            })
                        }
                    })
                })
            }
        })
    },
    getBillById: (req, res) => {
        const bill_id = req.body.id
        getBillById(bill_id, (err, results) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error"
                })
            } else {
                var bill = {
                    id: results[0].bill_id,
                    email: results[0].email,
                    createDate: results[0].create_date,
                    paiedDate: results[0].paied_date,
                    products: []
                }
                results.forEach(element => {
                    bill.products.push({
                        product_id: element.product_id,
                        product_name: element.product_name,
                        product_quantity: element.product_quantity,
                        total: element.total
                    })
                })
                res.status(200).json({
                    message: "Get bill successfully",
                    data: bill
                })
            }
        })
    },
    updateBill: (req, res) => {
        const bill_id = req.body.id
        const data = req.body
        console.log(data)
        console.log(bill_id)
        updateBill(bill_id, data, (err, results) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error"
                })
            } else {
                res.status(200).json({
                    message: "Update bill successfully"
                })
            }
        })
    },
    deleteBill: (req, res) => {
        const bill_id = req.params.id
        var quantity_return = [];
        var current_quantity = [];
        getBillById(bill_id, (err, results) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error"
                })
            } else {
                //get product quantity in bill
                results.forEach(element => {
                    quantity_return.push({
                        product_id: element.product_id,
                        product_quantity: element.product_quantity
                    })
                })
                console.log('quantity_return')
                console.log(quantity_return)
                //get current quantity
                quantity_return.forEach(element => {
                    getProductQuantity(element.product_id, (err, results) => {
                        if (err) {
                            res.status(500).send({
                                message: "Internal server error"
                            })
                        } else {
                            current_quantity.push({
                                product_id: element.product_id,
                                product_quantity: parseInt(results.product_quantity) 
                            })
                // return quantity for product
                            quantity_return.forEach(element => {
                                current_quantity.forEach(element2 => {
                                    if (element.product_id == element2.product_id) {
                                        var quantity = element2.product_quantity + element.product_quantity
                                        updateProuctQuantity(element.product_id, quantity, (err, results) => {
                                            if (err) {
                                                res.status(500).send({
                                                    message: "Internal server error"
                                                })
                                            }
                                        })
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })
        deleteBill(bill_id, (err, results) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error"
                })
            } else {
                res.status(200).json({
                    message: "Delete bill successfully"
                })
            }
        })
    },
  
    getBillByCustomerEmail: (req, res) => {
        const email = req.body.email
        getBillByCustomerEmail(email, (err, results) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error"
                })
            } else {
                console.log(results)
                var bill = []
                results.forEach(element => {
                    bill.push({
                        id: element.bill_id,
                        email: element.email,
                        createDate: element.create_date,
                        paidDate: element.paid_date,
                        products: []
                    })
                })
                results.forEach(element => {
                    bill.forEach(element2 => {
                        if (element.bill_id == element2.id) {
                            element2.products.push({
                                product_id: element.product_id,
                                product_name: element.product_name,
                                product_quantity: element.product_quantity,
                                total: element.total
                            })
                        }
                    })
                })
                res.status(200).json({
                    message: "Get bill successfully",
                    data: bill
                })
            }
        })
    },
    getSellStatistic: (req, res) => {
        getStat((err, results) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error"
                })
            } else {
                res.status(200).json({
                    message: "Get statistic successfully",
                    data: results
                })
            }
        })
    }
}