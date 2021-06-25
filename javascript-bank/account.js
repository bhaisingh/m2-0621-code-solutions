/* exported Account */

function Account(inNumber, inHolder) {
    this.number = inNumber,
    this.holder = inHolder,
    this.transactions = []

    return this.number, this.holder
}

Account.prototype.deposit = function (amount) {
    if (Number.isInteger(amount) && amount > 0) {
        const newTransaction = new Transaction('deposit', amount);
        this.transactions.push(newTransaction);
        return true;
    } else {
        return false;
    }
}

Account.prototype.withdraw = function (amount) {
    if (Number.isInteger(amount) && amount > 0) {
        const newTransaction = new Transaction('withdrawal', amount);
        this.transactions.push(newTransaction);
        return true;
    } else {
        return false;
    }
}

Account.prototype.getBalance = function () {
    if (this.transactions.length === 0) {
        return 0;
    } else {
        let depositTotal = 0;
        let withdrawlTotal = 0;
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i]['type'] === 'deposit') {
                depositTotal += this.transactions[i]['amount']
            } else {
                withdrawlTotal += this.transactions[i]['amount']
            }
        }
        return depositTotal - withdrawlTotal;
    }
}