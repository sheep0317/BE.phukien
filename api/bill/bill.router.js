const router = require("express").Router()

const { checkTokenUser, checkTokenAdmin, checkToken } = require("../../authentication/token_validation")
const { 
    createBill,
    getAllBill,
    getBillById,
    updateBill,
    deleteBill,
    getSellStatistic,
    getBillByCustomerEmail
} = require("./bill.controller")

router.post("/createBill", checkTokenUser, createBill)
router.get("/getAll", checkTokenAdmin, getAllBill)
router.post("/getBill",checkToken, getBillById)//getBillById
router.patch("/updateBill/", checkTokenAdmin, updateBill)// update paid date
router.delete("/delete/:id", checkTokenAdmin,deleteBill)// deletebill by Id
router.get("/stat",checkTokenAdmin, getSellStatistic)
router.post("/getBillByEmail", checkToken,getBillByCustomerEmail)

module.exports = router