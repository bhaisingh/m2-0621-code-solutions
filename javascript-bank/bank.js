/* exported Bank */

function Bank() {
    this.nextAccountNumber = 1;
    this.accounts = [];
}

Bank.prototype.openAccount = function (holder, balance) {
    if (Number.isInteger(balance) && balance > 0) {
        var newAccount = new Account(this.nextAccountNumber,holder);
        newAccount.deposit(balance);
        this.accounts.push(newAccount);
        this.nextAccountNumber += 1;
        return this.nextAccountNumber - 1;
     } else {
        return null;
    }
}

Bank.prototype.getAccount = function (accountNo) {
    if (this.accounts.length > 0) {
        for (let i = 0; i < this.accounts.length; i++) {
            if (this.accounts[i]['number'] === accountNo) {
                var accountDetails = this.accounts[i];
                return accountDetails;
            }
        }
        return null;
    }
    return null;
}

Bank.prototype.getTotalAssets = function () {
    if (this.accounts.length === 0) {
        return 0;
    } 
    let totalAsset = 0;
    for (let i = 0; i < this.accounts.length; i++) {
        totalAsset += this.accounts[i].getBalance();
    }
    return totalAsset;
}
