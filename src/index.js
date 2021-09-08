require('dotenv').config()

const { 
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
  const contract = new EthContractTransactionService(
    '0x6E405f9203a2D7f3e3bf38C332e7852D0ad76553'
  )

  await contract.transform(
    TRANSACTION_TYPES.sent
  )

  let csv = new ContractTransactionToCsvService(contract)

  csv.run('sent-transactions');

  await contract.transform(
    TRANSACTION_TYPES.received
  )
  
  csv = new ContractTransactionToCsvService(contract)

  csv.run('received-transactions');
})()


// Нам нужно написать скрипт, который бы вытаскивал информацию по отправленным и полученым транзакциям.
// Т.е. в итоге, после того как скрипт выполнится, я ожидаю что у меня появится фаил, к примеру csv.
// В котором будет список всех трансферов.
// Нужна следующая информация - lock_id (это внутрений id трансфера),
// адрес отправителя (если это транзакция отправления),
// адрес получателя,
// сумма,
// id транзакции,
// время транзакции,
// тип транзакции (отправка или получение)
// сеть отправителя,
// сеть получателя,
// токен который отправляется,
