const express = require('express')
const {
    getAllTxs,
    getOneTx,
    addTx,
    deleteTx,
    updateTx
} = require('../controllers/txController')
// creating router
const router = express.Router()
// creating endpoints
router.get('/', getAllTxs)
router.get('/:id', getOneTx)
router.post('/', addTx)
router.delete('/:id', deleteTx)
router.patch('/:id', updateTx)

module.exports = router