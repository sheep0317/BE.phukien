const pool = require('../../config/database');

module.exports = {
    createBill: (email,bill_id, data, date, callBack) => {
        pool.query(
            `INSERT INTO bill values (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                bill_id,
                data.product_name,
                data.product_quantity,
                data.total,
                data.product_id,
                email,
                date.create_date,
                date.paied_date
            ],
            (err, result) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, result)
            }
        )
    },
    getNewBillId: (callBack) => {
        pool.query(
            `SELECT MAX(bill_id) FROM bill`,
            (err, result) => {
                if (err) {
                    return callBack(err)
                }
                result = result[0]['MAX(bill_id)'] + 1
                
                return callBack(null, result)
            }
        )
    }
        
}
