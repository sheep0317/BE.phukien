const pool = require("../../config/database")

module.exports = {
    getCart: (email, callBack) => {
        pool.query(
            `SELECT * FROM user_cart WHERE user_email = ?`,
            [email],
            (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },
    addToCart: (data, callBack) => {
        pool.query(
            `INSERT INTO user_cart values (?, ?, ?)`,
            [
                data.email, 
                data.product_id, 
                data.product_quantity
            ],
            (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },
    updateCart: (data, callBack) => {
        pool.query(
            `UPDATE user_cart SET quantity = ? WHERE user_email = ? AND product_id = ?`,
            [
                data.product_quantity, 
                data.email, 
                data.product_id
            ],
            (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },
    deleteCart: (data, callBack) => {
        pool.query(
            `DELETE FROM user_cart WHERE user_email = ? AND product_id = ?`,
            [
                data.email, 
                data.product_id
            ],
            (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },
    clearCart: (email, callBack) => {
        pool.query(
            `DELETE FROM user_cart WHERE user_email = ?`,
            [email],
            (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    }

}