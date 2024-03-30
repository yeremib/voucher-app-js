const Transaction = require('../models/transaction')
const mongoose = require('mongoose');
const Voucher = require('../models/voucher');
const {mutateExecOptions} = require("nodemon/lib/config/load");


const createNewTransaction = async (req, res) => {
    const {voucherId, amount}  = req.body;

    const voucher = await Voucher.findById(voucherId);
    if(!voucher) {
        return res.status(404).json({message:'voucher not found'});
    }
    if(voucher.balance < 0) {
        return res.status(400).json({message:'balance not enough'})
    }

    voucher.balance -= amount;

    const transaction = await Transaction.create({
        transactionDate: new Date(),
        amount
    })

    await Promise.all([voucher.save(), transaction.save()]);

    res.status(202).json({transaction});
}

const getTransactionById =  async (req, res) => {
    const transactionId = req.params.id;

    const transaction = await Transaction.aggregate([
        {
            $match: {_id : new mongoose.Types.ObjectId(transactionId)}
        },
        {
            $lookup: {
                from: 'vouchers',
                localField: 'voucher',
                foreignField: '_id',
                as: 'voucher',
            }
        },
        {
            $unwind: '$voucher'
        },
        {
            $project: {
                transDate:1,
                voucher: {
                    customer: 1,
                    product: 1,
                    balance: 1
                },
                amount:1,
            }
        }
    ])
    res.json({transaction})
}

const getTransactions = async (req, res) => {
    const transactions = await Transaction.find();
    res.status(200).json({transactions});
}

module.exports = {
    createNewTransaction,
    getTransactionById,
    getTransactions
}