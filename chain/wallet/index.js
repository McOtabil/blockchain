const ChainUtil = require('../chain-util');
const { INITIAL_BALANCE } = require('../config');
const Transaction = require('./transaction');


class Wallet{
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString(){
        return`Wallet - 
        publicKey: ${this.publicKey.toString()}
        balance  : ${this.balance}`
    }

    sign(datahash){
        return this.keyPair.sign(datahash);
    }

    createTransaction(recipient, amount , transactionpool){
        if (amount > this.balance) {
            console.log(`Amount: ${amount}, exceeds current balance: ${this.balance}`);
            return;
          }
        let transaction = transactionpool.existingTransaction(this.publicKey);
        if(transaction){
            transaction.update(this,recipient,amount);
        }else{
            transaction = Transaction.newTransaction(this,recipient,amount);
            transactionpool.updateOrAddTransaction(transaction);
        }
        return transaction
    }

    }

    


module.exports = Wallet;
