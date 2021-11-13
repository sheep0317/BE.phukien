const {userRegister, 
    updateUser, 
    getUserByEmail, 
    getUsers, 
    deleteUser,
    login} 
= require("./user.controller")
const jsonParser = require("body-parser").json()
const router = require("express").Router()
const {checkTokenAdmin,
checkTokenUser }= require('./../../authentication/token_validation')


router.post("/register", userRegister);
router.get("/all",checkTokenAdmin, getUsers);
router.post("/delete", checkTokenAdmin,deleteUser);
router.post("/update", checkTokenAdmin, updateUser);
router.post("/login",login );
module.exports = router;