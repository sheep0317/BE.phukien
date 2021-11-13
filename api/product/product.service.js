const pool = require("../../config/database")

module.exports = {
    getAllProduct: (req, res) => {
        pool.query("SELECT * FROM products", (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    }
}