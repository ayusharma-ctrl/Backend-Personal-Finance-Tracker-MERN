import { Transaction } from '../models/transactions.js'


export const createTransaction = async (req, res) => {
    try {
        const { title, category, amount, amountType } = req.body;
        await Transaction.create({
            title,
            category,
            amount,
            amountType,
            user: req.user
        })
        res.status(201).json({
            success: true,
            message: "Added!"
        })
    }
    catch (e) {
        console.log(e);
    }
}


export const updateTransaction = async (req, res) => {
    try {
        const transactionID = req.params.id;
        const { title, category, amount, amountType } = req.body;
        const transaction = await Transaction.findById(transactionID);
        transaction.title = title;
        transaction.category = category;
        transaction.amount = amount;
        transaction.amountType = amountType;
        await transaction.save();
        res.status(200).json({
            success: true,
            message: "Updated!"
        })
    }
    catch (e) {
        console.log(e);
    }
}


export const allTransactions = async (req, res) => {
    try {
        const userId = req.user._id;
        const allTransactions = await Transaction.find({ user: userId })
        res.status(200).json({
            success: true,
            allTransactions
        })
    }
    catch (e) {
        console.log(e);
    }
}


export const deleteTransaction = async (req, res) => {
    try {
        const transactionID = req.params.id;
        const transaction = await Transaction.findById(transactionID);
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "No such transaction Found!"
            })
        }
        await transaction.deleteOne();
        res.status(200).json({
            success: true,
            message: "Deleted!"
        })
    }
    catch (e) {
        console.log(e);
    }
} 