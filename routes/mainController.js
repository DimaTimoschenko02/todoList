const {Router} = require('express')
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const router = Router()


// looks like shit?
router.get('/'  , (req, res) => {
    res.redirect('/user/login')
})

router.use('/user', userRouter)
router.use('/todo' , todoRouter)

module.exports = router
