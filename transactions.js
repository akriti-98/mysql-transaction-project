const sequelize = require('./helpers/db');
const Account = require('./models/account');

const transferMoney = async function (fromAccountId, toAccountId, amount) {
    const transaction = await sequelize.transaction();
    try {
        const accountFrom = await Account.findByPk(fromAccountId, {transaction});
        const accountTo = await Account.findByPk(toAccountId, {transaction});
        if (!accountFrom || !accountTo) throw new Error("Account not found");
        if (accountFrom.balance < amount) throw new Error("Insufficient balance");
        const fromBalance = parseFloat(accountFrom.balance);
        const toBalance = parseFloat(accountTo.balance);

        // Example: Perform balance updates
        accountFrom.balance = fromBalance - amount;
        accountTo.balance = toBalance + amount;
        await accountFrom.save({transaction});
        console.log('Saving To Account...');
        await accountTo.save({transaction});
        console.log('To Account saved successfully.');

        await transaction.commit()
        console.log("Transaction committed");
    } catch (error) {
        if (transaction && !transaction.finished) {
            await transaction.rollback();
        }
        console.error("transaction rolledback")
    }
}

module.exports = {transferMoney};