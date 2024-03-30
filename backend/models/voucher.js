const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    buyDate: Date,
    customer: String,
    product: String,
    balance: Number,
});

const Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;