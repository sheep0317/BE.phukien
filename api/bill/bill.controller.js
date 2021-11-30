const { 
    createBill,
    getNewBillId,
    getBillById,
    updateBill,
    getBillByCustomerEmail,
    deleteBill,
    getAllBillId,
    cancelBill,
    getStat
} = require('./bill.service')

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
                    createBill(email, bill_id, product, date, (err, results) => {
                        if (err) {
                            res.status(500).json({
                                message: "Error when creating bill",
                                error: err
                            })
                        }
                    })
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
        const bill_id = req.params.id
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
        const bill_id = req.params.id
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
    cancelBill: (req, res) => {
        const bill_id = req.params.id
        cancelBill(bill_id, (err, results) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error"
                })
            } else {
                res.status(200).json({
                    message: "Cancel bill successfully"
                })
            }
        })
    },
    getBillByCustomerEmail: (req, res) => {
        const email = req.params.email
        getBillByCustomerEmail(email, (err, results) => {
            if (err) {
                res.status(500).send({
                    message: "Internal server error"
                })
            } else {
                var bill = {
                    id: results[0].bill_id,
                    email: results[0].email,
                    createDate: results[0].create_date,
                    paidDate: results[0].paid_date,
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