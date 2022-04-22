const {Router} = require('express')
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const router = Router()

router.use('/user', userRouter)
router.use('/todo' , todoRouter)

module.exports = router
