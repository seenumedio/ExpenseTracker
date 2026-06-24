const express = require('express')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const {
    getAllTxs,
    getOneTx,
    addTx,
    deleteTx,
    updateTx,
    scanReceipt,
} = require('../controllers/txController')
const { getStats } = require('../controllers/statsController');
// creating router
const router = express.Router()
// apply auth middleware to all routes below
router.use(auth);
router.get('/stats', getStats);
// creating endpoints
/* scan-receipt route must come 1st; if /:id comes before-> express may treat it as id */
router.post('/scan-receipt', upload.single('receipt'), scanReceipt);
router.get('/', getAllTxs)
router.get('/:id', getOneTx)
router.post('/', addTx)
router.delete('/:id', deleteTx)
router.patch('/:id', updateTx)

module.exports = router