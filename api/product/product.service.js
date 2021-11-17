const pool = require("../../config/database")

module.exports = {
    getAllProduct: (callBack) => {
        pool.query(`SELECT * FROM products`, (err, result, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, result)
        })
    },
    getProductById: (id, callBack) => {
        pool.query(
            `SELECT * FROM products WHERE productid = ?`,
            [id], 
            (err, result) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, result[0])
        })
    },
}