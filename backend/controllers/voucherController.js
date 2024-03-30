const Voucher = require("../models/voucher");

const getVouchers = async (req, res) => {
    const vouchers = await Voucher.find();
    res.json({vouchers});
};

const getVoucherById = async (req, res) => {
    const voucherId = req.params.id;
    const voucher = await Voucher.findById(voucherId);
    res.json({voucher});
};

const createNewVoucher = async (req, res) => {
    const {customer, product, balance} = req.body;

    const voucher = await Voucher.create({
        buyDate: new Date(),
        customer,
        product,
        balance,
    })

    res.json({voucher})
}

const updateVoucher = async (req, res) => {
    const voucherId = req.params.id;
    const {topup} = req.body;

    const voucher = await Voucher.findById(voucherId);

    await Voucher.findByIdAndUpdate(voucherId, {
       balance: voucher.balance + topup
    });

    const topupVoucher = await Voucher.findById(voucherId);

    res.json({topupVoucher});
}

const deleteVoucher = async (req, res) => {
    const voucherId = req.params.id;

    await Voucher.deleteOne({_id: voucherId});
    res.json({success: "record deleted"});
}

module.exports = {
    getVouchers,
    getVoucherById,
    createNewVoucher,
    updateVoucher,
    deleteVoucher
}