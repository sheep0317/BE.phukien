const pool = require("../../config/database")

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO users (email, displayname, password, address, gender, phone, role)
                values(?, ?, ?, ?, ?, ?, ?)`,
            [
                data.email,
                data.displayname,
                data.password,
                data.address,
                data.gender,
                data.phone,
                1
            ],
            (error, result, field) => {
                if (error){
                    return callBack(error)
                }
                return callBack(null, result)
            }
        )
    },
    getUsers: (callBack) => {
        pool.query(
            `SELECT * FROM users`,
            (error, result, field) => {
                if (error){
                    return callBack(error)
                }
                return callBack(null, result)
            }
        )
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (error, results, field) => {
                if (error){
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE users SET displayname = ?, address = ?, gender = ?, phone = ? where email = ?`,
            [
                data.displayname,
                data.address,
                data.gender,
                data.phone,
                data.email
            ],
            (error, results, fields) =>{
                if (error){
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },
    deleteUser: (data, callBack) => {
        pool.query(
            `DELETE FROM users WHERE email = ?`,
            [data.email],
            (error, results, field) => {
                if (error){
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },
}