const ObjectsToCsv = require('objects-to-csv');

module.exports = class ContractTransactionToCsvService {
  contract

  constructor(contract) {
    this.contract = contract
  }

  run(filename = 'transactions', dist = './dist') {
    const csv = new ObjectsToCsv(this.contract.transactions);
    
    const file = `${dist}/${filename}.csv`

    csv.toDisk(file);
  }
}
