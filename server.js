const express = require('express');
const sequelize = require('./helpers/db');
const Account = require('./models/account');
const {transferMoney} = require('./transactions');

const app = express();
app.use(express.json());


app.post('/create-account', async (req, res) => {
    const {account_holder, initial_bal} = req.body;
    const account = Account.create({account_holder, balance: initial_bal});
    return res.json(account);
})

app.post('/transfer', async (req, res) => {
    const {from_account_id, to_account_id, amount} = req.body;
    try {
        await transferMoney(from_account_id, to_account_id, amount);
        return res.status(200).send("Transfer successfully")
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
});
