const router = require("express").Router()

const { checkTokenUser, checkTokenAdmin } = require("../../authentication/token_validation")
const { 
    createBill,
    getAllBill,
    getBillById,
    updateBill,
    deleteBill,
    cancelBill,
    getSellStatistic,
} = require("./bill.controller")

router.post("/createBill", checkTokenUser, createBill)
router.get("/getAll", checkTokenAdmin, getAllBill)
router.get("/get/:id", getBillById)
router.patch("/updateBill/:id", checkTokenUser, updateBill)
router.put("/updateBill/:id/cancel", checkTokenUser, cancelBill)
router.delete("/delete/:id", checkTokenAdmin, deleteBill)
router.get("/stat",checkTokenAdmin, getSellStatistic)


module.exports = router