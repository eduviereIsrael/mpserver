const { Router } = require('express')
const initializeTest = require("../controllers/controllers")
const router = Router()

router.get('/test', initializeTest.testApi)
router.get('/verify', initializeTest.verifyPayment)
router.post('/acceptpayment', initializeTest.acceptPayment)
router.post('/subscribe', initializeTest.subscription)
router.post('/fetchuser', initializeTest.fetchCustomer)
router.post('/fetchsub', initializeTest.fetchSubscription)

module.exports = router