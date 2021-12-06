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
    },
    updateBill: (bill_id, data, callBack) => {
        pool.query(
            `UPDATE bill SET paid_date = ? WHERE bill_id = ?`,
            [
                data.paid_date,
                bill_id
            ],
            (err, result) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, result)
            }
        )
    },
    deleteBill: (bill_id, callBack) => {
        pool.query(
            `DELETE FROM bill WHERE bill_id = ?`,
            [
                bill_id
            ],
            (err, result) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, result)
            }
        )
    },
    getBillById: (bill_id, callBack) => {
        pool.query(
            `SELECT * FROM bill WHERE bill_id = ?`,
            [
                bill_id
            ],
            (err, result) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, result)
            }
        )
    },
    getBillByCustomerEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM bill WHERE email = ?`,
            [
                email
            ],
            (err, result) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, result)
            }
        )
    },
    getAllBillId: (callBack) => {
        pool.query(
            `SELECT DISTINCT bill_id FROM bill`,
            (err, result) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, result)
            }
        )
    },
    getStat: (callBack) => {
        pool.query(
            `SELECT total, paid_date FROM bill`,
            (err, result) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, result)
            }
        )
    }
    
}
