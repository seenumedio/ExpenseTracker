const Transaction = require('../models/txModel')
const { createWorker } = require('tesseract.js'); //import tesseract
// import ai parser
const { parseReceiptWithGemini } = require('../utils/parseReceiptWithGemini');
const mongoose = require('mongoose')

// get all txs
const getAllTxs = async (req, res) => {
    try {
        const { search, type, recurring, startDate, endDate } = req.query;
        // always include userId in query to ensure isolation
        const query = { userId: req.user.id }
        // case-insensitive substring match with tx category/description
        if (search) {
            query.$or = [
                { category: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ]
        }
        if (type && type !== 'all') {
            query.type = { $regex: type, $options: 'i' };
        }
        if (recurring && recurring !== 'all') {
            query.recurring = { $regex: recurring, $options: 'i' };
        }
        // Add date range bounds
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }
        const txs = await Transaction.find(query).sort({ date: -1 })
        res.status(200).json(txs)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
// get spec tx
const getOneTx = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ mssg: 'Invalid id' })

    const tx = await Transaction.findOne({ _id: id, userId: req.user.id })
    if (!tx) return res.status(404).json({ mssg: 'Transaction not found' })

    res.status(200).json(tx)
}
// add tx
const addTx = async (req, res) => {
    const { type, category, recurring, description, date, amount } = req.body
    console.log(req.body);
    try {
        const startDate = date ? new Date(date) : new Date()
        startDate.setHours(0, 0, 0, 0)
        const tx = await Transaction.create({
            type,
            category,
            recurring,
            description,
            amount,
            date: startDate,
            userId: req.user.id,
        })
        res.status(200).json(tx)
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message })
    }
}
// delete tx
const deleteTx = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ mssg: 'Invalid id' })
    try {
        const tx = await Transaction.findOneAndDelete({ _id: id, userId: req.user.id })
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
        const tx = await Transaction.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { ...req.body },
            { new: true, runValidators: true }
        )
        if (!tx)
            return res.status(404).json({ mssg: 'Transaction not found' })
        res.status(200).json(tx)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
// scan receipt
const scanReceipt = async (req, res) => {
    try {
        // check if img uploaded successfully by multer
        if (!req.file)
            return res.status(400).json({ success: false, message: 'No image uploaded' });
        //create tesseract worker to identify english text
        const worker = await createWorker('eng');
        //run OCR on buffer img from RAM
        const { data: { text } } = await worker.recognize(req.file.buffer);
        await worker.terminate();//always free the memory
        // parse raw ocr text to structured data
        const parsedData = await parseReceiptWithGemini(text);
        res.json({ success: true, data: parsedData });
    } catch (err) {
        res.json({ success: false, mssg: err.message })
    }
}
module.exports = {
    getAllTxs,
    getOneTx,
    addTx,
    deleteTx,
    updateTx,
    scanReceipt,
}