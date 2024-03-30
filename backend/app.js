// Env Variables
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Dependencies
const express =  require('express');
const cors = require('cors')
const connectToDB = require('./config/connectToDB')
const {
    getVouchers,
    getVoucherById,
    createNewVoucher,
    updateVoucher,
    deleteVoucher
} = require("./controllers/voucherController");

const {
    createNewTransaction,
    getTransactionById,
    getTransactions} = require('./controllers/transactionController');

// Express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors({
        origin: "http://localhost:3001"
    })
)

// Connect to Database
connectToDB();

// Voucher Routing
app.get('/voucher', getVouchers);

app.get('/voucher/:id', getVoucherById);

app.post('/voucher', createNewVoucher);

app.put('/voucher/:id', updateVoucher);

app.delete('/voucher/:id', deleteVoucher);

// Transaction Routing
app.post('/transaction', createNewTransaction);

app.get('/transaction/:id', getTransactionById);

app.get('/transaction/', getTransactions);

// Start Server
app.listen(process.env.PORT);