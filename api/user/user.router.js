const { userRegister, 
        updateUser, 
        getUsers, 
        deleteUser,
        login,
        changePassword 
    } = require("./user.controller");
const router = require("express").Router()
const {checkTokenAdmin,
checkTokenUser }= require('./../../authentication/token_validation')


router.post("/register", userRegister);
router.get("/all",checkTokenAdmin, getUsers);
router.post("/delete", checkTokenAdmin,deleteUser);
router.post("/update", checkTokenAdmin, updateUser);
router.post("/login",login );
router.post("/changePassword",checkTokenUser,changePassword);
module.exports = router;