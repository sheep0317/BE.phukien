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
    updateProuctQuantity: (id, quantity, callBack) => {
        pool.query(
            `UPDATE products SET product_quantity = ? WHERE productid = ?`,
            [quantity, id],
            (err, result) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, result)
            }
        )
    },
    getProductQuantity: (id, callBack) => {
        pool.query(
            `SELECT product_quantity FROM products WHERE productid = ?`,
            [id],
            (err, result) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, result[0])
            }
        )
    },
    deleteProduct: (id, callBack) => {
        pool.query(
            `DELETE FROM products WHERE productid = ?`,
            [id],
            (err, result) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, result)
            }
        )
    },
    addProduct: (data, callBack) => {
        pool.query(
            `SELECT MAX(productid) FROM products`,
            (err, result) => {
                if(err) {
                    return callBack(err)
                }
                if(result) {
                    var maxId = result[0]['MAX(productid)'];
                    var newId = maxId + 1;
                    var product_status = 0;
                    if (data.product_quantity > 0) {
                        product_status = 1;
                    }
                    pool.query(
                        `INSERT INTO products ( productid, 
                                                product_description, 
                                                product_name, 
                                                product_price, 
                                                product_quantity, 
                                                product_status, 
                                                product_type, 
                                                product_brand, 
                                                product_image ) 
                                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [
                            newId, 
                            data.product_description,
                            data.product_name, 
                            data.product_price,
                            data.product_quantity,
                            product_status,
                            data.product_type,
                            data.product_brand, 
                            data.product_image,
                        ],
                        (err, result) => {
                            if(err) {
                                return callBack(err)
                            }
                            return callBack(null, result)
                        }
                    )
                }
            }
        )
    },
    updateProduct: (id, data, callBack) => {
        var product_status = 0;
        if (data.product_quantity > 0) {
            product_status = 1;
        }
        pool.query(
            `   UPDATE products 
                SET 
                product_price = ?, 
                product_quantity = ?, 
                product_status = ?, 
                WHERE productid = ?`,
                [
                    data.product_price,
                    data.product_quantity,
                    product_status,
                    id
                ],
            (err, result) => {
                if(err) {
                    return callBack(err)
                }
                return callBack(null, result)
            }
        )
    }
}