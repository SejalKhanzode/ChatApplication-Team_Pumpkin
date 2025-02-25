const express = require('express')
const registerUser = require('../controller/registerUser')
const loginUser = require("../controller/loginUser")
const userDetails = require('../controller/userDetails')
const logout = require('../controller/logout')
const searchUser = require('../controller/searchUser')

const router = express.Router()

router.post('/register',registerUser)
router.post('/login', loginUser)
router.get('/user-details',userDetails)
router.get('/logout',logout)
router.post("/search-user",searchUser)


module.exports = router