const { userRegister, 
        updateUser, 
        getAllUsers, 
        deleteUser,
        login,
        changePassword,
        forgetPassword,
        resetPassword,
        getUserByEmail,
    } = require("./user.controller");
const router = require("express").Router()
const {checkTokenAdmin,
checkTokenUser,
checkToken }= require('./../../authentication/token_validation')


router.post("/register", userRegister);
router.get("/all",checkTokenAdmin, getAllUsers);
router.post("/get",checkToken, getUserByEmail);
router.post("/delete", checkTokenAdmin,deleteUser);
router.post("/update", checkTokenAdmin, updateUser);
router.post("/login",login );
router.post("/changePassword",checkToken,changePassword);
router.post("/forgetPassword",forgetPassword);
router.post("/resetPassword",resetPassword);

module.exports = router;