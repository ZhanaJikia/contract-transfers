require('dotenv').config()

const { 
  TokenBankService,
  EthContractTransactionService,
  ContractTransactionToCsvService
} = require('./services')
const { TRANSACTION_TYPES } = require('./consts')

// Solbridge Ethereum: 0x6E405f9203a2D7f3e3bf38C332e7852D0ad76553
// Solbridge BSC: 0x0AC4a2F14927C7e038a3962B647Dc7527d8a7229
// Solbridge HECO: 0x590Fb6331fAf4e38321CFC7CD8a01D8ef526c74b
// Solbridge Polygon: 0x44AAA9eBafb4557605de574D5E968589DC3a84D1
// Solbridge Solana Program: so1buKUADShkXBbLGnTrkabjMg8A3KJdgQDqyJtQ1GV
// Solbridge Solana Account: b1ZjmXu6M3zoP9P7GCvAg56BcQ9qa1PCcpmpp7pzjkP

;(async () => {

  const contracts = {
    ETH: {
      symbol: 'ETH',
      contractAddress: '0x6E405f9203a2D7f3e3bf38C332e7852D0ad76553',
      provider: process.env.ETH_PROVIDER
    },
    BSC: {
      symbol: 'BSC',
      contractAddress: '0x0AC4a2F14927C7e038a3962B647Dc7527d8a7229',
      provider: process.env.BSC_PROVIDER
    },
    HECO: {
      symbol: 'HECO',
      contractAddress: '0x590Fb6331fAf4e38321CFC7CD8a01D8ef526c74b',
      provider: process.env.HECO_PROVIDER
    },
    Polygon: {
      symbol: 'Polygon',
      contractAddress: '0x44AAA9eBafb4557605de574D5E968589DC3a84D1',
      provider: process.env.POLYGON_PROVIDER
    },
    SolanaProgram: {
      symbol: 'Solana Program',
      contractAddress: 'so1buKUADShkXBbLGnTrkabjMg8A3KJdgQDqyJtQ1GV',
      provider: process.env.SOLANA_PROVIDER
    },
    SolanaAccount: {
      symbol: 'Solana Account',
      contractAddress: 'b1ZjmXu6M3zoP9P7GCvAg56BcQ9qa1PCcpmpp7pzjkP',
      provider: process.env.SOLANA_PROVIDER
    }
  }

  const tokenBank = new TokenBankService(process.env.TOKEN_BANK_URL)
  await tokenBank.run()


  const contract = new EthContractTransactionService(
    contracts.ETH
  )

  contract.setTokenBank(tokenBank.tokens)

  await contract.transform(
    TRANSACTION_TYPES.sent
  )

  let csv = new ContractTransactionToCsvService(contract)

  csv.run('sent-transactions')
  
  await contract.transform(
    TRANSACTION_TYPES.received
  )

  csv = new ContractTransactionToCsvService(contract)

  csv.run('received-transactions')
})()