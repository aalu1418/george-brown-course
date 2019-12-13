import { ethers } from 'ethers'

const NETWORK = 'goerli'

export default async function sendTransaction({ valueInEth, gas, toAddress, message }) {
  const accounts = await window.ethereum.enable()
  console.log('Accounts found:', accounts)

  const provider = ethers.getDefaultProvider(NETWORK)
  const gasPrice = await provider.getGasPrice()

  let transactionParameters = {
    to: toAddress,
    from: accounts[0],
    gas: ethers.utils.hexlify(gas),
    gasPrice: gasPrice.toHexString(),
    value: ethers.utils.parseEther(valueInEth).toHexString(),
  }

  if (message.trim() !== "") {
    const messageHash = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
    transactionParameters = {...transactionParameters, data: messageHash }
  }


  console.log('Sending transaction with params:', transactionParameters)
  const response = await window.ethereum.send('eth_sendTransaction', [
    transactionParameters,
  ])

  console.log(
    'Sent transaction: %o',
    `https://${NETWORK}.etherscan.io/tx/${response.result}`,
  )
}
