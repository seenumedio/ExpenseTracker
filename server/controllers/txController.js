const Transaction = require('../models/txModel')
const mongoose = require('mongoose')

// get all txs
const getAllTxs = async (req, res) => {
    const txs = await Transaction.find({}).sort({ date: -1 })
    res.status(200).json(txs)
}
// get spec tx
const getOneTx = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ mssg: 'Invalid id' })

    const tx = await Transaction.findById(id)
    if (!tx) return res.status(404).json({ mssg: 'Transaction not found' })

    res.status(200).json(tx)
}
// add tx
const addTx = async (req, res) => {
    const { type, category, recurring, description, date, amount } = req.body
    try {
        const startDate = date ? new Date(date) : new Date()
        startDate.setHours(0, 0, 0, 0)
        const exists = await Transaction.findOne({ type, category, recurring, description, amount, date: startDate })
        if (exists)
            return res.status(400).json({ mssg: 'Duplicate transaction found' })
        const tx = await Transaction.create({ type, category, recurring, description, amount, date: startDate })
        res.status(200).json(tx)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
// delete tx
const deleteTx = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ mssg: 'Invalid id' })
    try {
        const tx = await Transaction.findByIdAndDelete(id)
        if (!tx)
            return res.status(404).json({ mssg: 'Transaction not found' })
        res.status(200).json({ mssg: 'Transaction deleted successfully' })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
// update tx
const updateTx = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ mssg: 'Invalid id' })

    try {
        const tx = await Transaction.findByIdAndUpdate(
            id,
            { ...req.body },
            {new: true, runValidators: true}
        )
        if (!tx)
            return res.status(404).json({ mssg: 'Transaction not found' })
        res.status(200).json(tx)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = {
    getAllTxs,
    getOneTx,
    addTx,
    deleteTx,
    updateTx
}