const router = require('express').Router()
const ctris = require('../controllers/user')
const {verifyAccessToken, isAdmin} = require ('../middlewares/verifyToken')

router.post('/register', ctris.register)
router.get('/finalregister/:token', ctris.finalRegister)
router.post('/login', ctris.login)
router.get('/current', verifyAccessToken, ctris.getCurrent)
router.post('/refreshtoken', ctris.refreshAccessToken)
router.get('/logout', ctris.logout)
router.get('/forgotpassword', ctris.forgotPassword)
router.put('/resetpassword', ctris.resetPassword)
router.get('/', [verifyAccessToken, isAdmin],ctris.getUsers)
router.delete('/', [verifyAccessToken, isAdmin],ctris.deleteUser)
router.put('/current', [verifyAccessToken], ctris.updateUser)
router.put('/address', [verifyAccessToken], ctris.updateUserAddress)
router.put('/cart', [verifyAccessToken], ctris.updateCart)
router.put('/:uid', [verifyAccessToken, isAdmin], ctris.updateUserByAdmin)
 


  





module.exports = router

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE 