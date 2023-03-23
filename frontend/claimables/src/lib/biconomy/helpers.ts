import { keccak256 } from 'ethers';
import abi from "ethereumjs-abi";
let helperAttributes = {} as any;
let supportedNetworks = [42, 4, 5]; //add more
helperAttributes.ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
helperAttributes.baseURL = "https://api.biconomy.io";
// any other constants needed goes in helperAttributes

helperAttributes.biconomyForwarderAbi = [{ "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "domainSeparator", "type": "bytes32" }, { "indexed": false, "internalType": "bytes", "name": "domainValue", "type": "bytes" }], "name": "DomainRegistered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "EIP712_DOMAIN_TYPE", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "REQUEST_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "domains", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "txGas", "type": "uint256" }, { "internalType": "uint256", "name": "tokenGasPrice", "type": "uint256" }, { "internalType": "uint256", "name": "batchId", "type": "uint256" }, { "internalType": "uint256", "name": "batchNonce", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "internalType": "structERC20ForwardRequestTypes.ERC20ForwardRequest", "name": "req", "type": "tuple" }, { "internalType": "bytes32", "name": "domainSeparator", "type": "bytes32" }, { "internalType": "bytes", "name": "sig", "type": "bytes" }], "name": "executeEIP712", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }, { "internalType": "bytes", "name": "ret", "type": "bytes" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "txGas", "type": "uint256" }, { "internalType": "uint256", "name": "tokenGasPrice", "type": "uint256" }, { "internalType": "uint256", "name": "batchId", "type": "uint256" }, { "internalType": "uint256", "name": "batchNonce", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "internalType": "structERC20ForwardRequestTypes.ERC20ForwardRequest", "name": "req", "type": "tuple" }, { "internalType": "bytes", "name": "sig", "type": "bytes" }], "name": "executePersonalSign", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }, { "internalType": "bytes", "name": "ret", "type": "bytes" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "uint256", "name": "batchId", "type": "uint256" }], "name": "getNonce", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "version", "type": "string" }], "name": "registerDomainSeparator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "txGas", "type": "uint256" }, { "internalType": "uint256", "name": "tokenGasPrice", "type": "uint256" }, { "internalType": "uint256", "name": "batchId", "type": "uint256" }, { "internalType": "uint256", "name": "batchNonce", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "internalType": "structERC20ForwardRequestTypes.ERC20ForwardRequest", "name": "req", "type": "tuple" }, { "internalType": "bytes32", "name": "domainSeparator", "type": "bytes32" }, { "internalType": "bytes", "name": "sig", "type": "bytes" }], "name": "verifyEIP712", "outputs": [], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "txGas", "type": "uint256" }, { "internalType": "uint256", "name": "tokenGasPrice", "type": "uint256" }, { "internalType": "uint256", "name": "batchId", "type": "uint256" }, { "internalType": "uint256", "name": "batchNonce", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "internalType": "structERC20ForwardRequestTypes.ERC20ForwardRequest", "name": "req", "type": "tuple" }, { "internalType": "bytes", "name": "sig", "type": "bytes" }], "name": "verifyPersonalSign", "outputs": [], "stateMutability": "view", "type": "function" }];

helperAttributes.biconomyForwarderDomainData = {
  name: "Biconomy Forwarder",
  version: "1",
};

helperAttributes.domainType = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "verifyingContract", type: "address" },
  { name: "salt", type: "bytes32" },
];

helperAttributes.forwardRequestType = [
  { name: 'from', type: 'address' },
  { name: 'to', type: 'address' },
  { name: 'token', type: 'address' },
  { name: 'txGas', type: 'uint256' },
  { name: 'tokenGasPrice', type: 'uint256' },
  { name: 'batchId', type: 'uint256' },
  { name: 'batchNonce', type: 'uint256' },
  { name: 'deadline', type: 'uint256' },
  { name: 'data', type: 'bytes' }
];

// pass the networkId to get contract addresses
async function getContractAddresses(networkId: number): Promise<any> {
  let contractAddresses = {} as any;
  const apiInfo = `${helperAttributes.baseURL
    }/api/v2/meta-tx/systemInfo?networkId=${networkId}`;
  const response = await fetch(apiInfo);
  const systemInfo = await response.json();
  console.log("Response JSON " + JSON.stringify(systemInfo));
  contractAddresses.biconomyForwarderAddress = systemInfo.biconomyForwarderAddress;
  return contractAddresses;
};

/**
 * Returns ABI and contract address based on network Id
 * You can build biconomy forwarder contract object using above values and calculate the nonce
 * @param {*} networkId 
 */
async function getBiconomyForwarderConfig(networkId: number): Promise<any> {
  //get trusted forwarder contract address from network id
  const contractAddresses = await getContractAddresses(networkId);
  const forwarderAddress = contractAddresses.biconomyForwarderAddress;
  return { abi: helperAttributes.biconomyForwarderAbi, address: '0x69015912AA33720b842dCD6aC059Ed623F28d9f7' };
};

/**
 * pass the below params in any order e.g. account=<account>,batchNone=<batchNone>,...
 * @param {*}  account - from (end user's) address for this transaction 
 * @param {*}  to - target recipient contract address
 * @param {*}  gasLimitNum - gas estimation of your target method in numeric format
 * @param {*}  batchId - batchId 
 * @param {*}  batchNonce - batchNonce which can be verified and obtained from the biconomy forwarder
 * @param {*}  data - functionSignature of target method
 * @param {*}  deadline - optional deadline for this forward request 
 */
function buildForwardTxRequest({ account, to, gasLimitNum, batchId, batchNonce, data, deadline }: any): any {
  const req = {
    from: account,
    to: to,
    token: helperAttributes.ZERO_ADDRESS,
    txGas: gasLimitNum,
    tokenGasPrice: "0",
    batchId: parseInt(batchId),
    batchNonce: parseInt(batchNonce),
    deadline: deadline || Math.floor(Date.now() / 1000 + 3600),
    data: data
  };
  return req;
};

/**
 * pass your forward request
 * use this method to build message to be signed by end user in personal signature format 
 * @param {*} networkId 
 */
function getDataToSignForPersonalSign(request: any): any {
  console.log(request);
  const hashToSign = abi.soliditySHA3([
    "address",
    "address",
    "address",
    "uint256",
    "uint256",
    "uint256",
    "uint256",
    "uint256",
    "bytes32",
  ], [
    request.from,
    request.to,
    request.token,
    request.txGas,
    request.tokenGasPrice,
    request.batchId,
    request.batchNonce,
    request.deadline,
    keccak256(request.data),
  ]);
  return hashToSign;
}

async function sendTransaction({ userAddress, req, sig, domainSeparator, signatureType }: any): Promise<any> {
  if ((window as any).ethereum) {
    let params;
    if (domainSeparator) {
      params = [req, domainSeparator, sig]
    } else {
      params = [req, sig]
    }
    try {
      fetch(`https://api.biconomy.io/api/v2/meta-tx/native`, {
        method: "POST",
        headers: {
          "x-api-key": 'kujn7aaDN.39afe3a1-d2bc-4745-bd53-6303399d12cf',
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "to": '0x70cfAB34E61c0e0e463b000c4355B37Bbe321d39',
          "apiId": '88012343-0026-4f9b-9805-60ea3b8751f8',
          "params": params,
          "from": userAddress,
          "signatureType": signatureType
        })
      })
        .then(response => response.json())
        .then(function (result) {
          console.log(result);
          console.log('transaction hash ' + result.txHash);
        })
        // once you receive transaction hash you can wait for mined transaction receipt here 
        // using Promise in web3 : web3.eth.getTransactionReceipt  
        // or using ethersProvider event emitters
        .catch(function (error) {
          console.log(error)
        });
    } catch (error) {
      console.log(error);
    }
  }
};

export {
  helperAttributes,
  getDataToSignForPersonalSign,
  buildForwardTxRequest,
  getBiconomyForwarderConfig,
  sendTransaction
};