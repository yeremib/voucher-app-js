const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionDate: Date,
    voucher: mongoose.Schema.Types.ObjectId,
    amount: Number,
    saldo: Number,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;