const { 
   createBill,
   getNewBillId
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
        
        
        
        
    }
}