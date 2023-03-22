import { BrowserProvider, Wallet, Contract, Interface } from "ethers";
import { buildForwardTxRequest, getBiconomyForwarderConfig, getDataToSignForPersonalSign, sendTransaction } from "./biconomyHelpers";

type Claimable = {
  PrivateKey: string,
  TokenContractAddress: string,
  TokenId: number
}

const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "CALL_DENIED",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "CLAIM_ATTEMPT",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "nft",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "externalClaimNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "gasToken",
        "type": "address"
      }
    ],
    "name": "externalSetGasToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "admin",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "forwarder",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "gasToken",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "forwarder",
        "type": "address"
      }
    ],
    "name": "isTrustedForwarder",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "admin",
        "type": "address"
      }
    ],
    "name": "revokeAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "setAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "trustedForwarder",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

async function claimNFT(claimable: Claimable): Promise<void> {
  console.log(claimable);
  let ethereum = (window as any).ethereum;
  if (!ethereum) {
    throw new Error('please install metamask');
  }
  let browser = new BrowserProvider(ethereum);

  let receiver = (await browser.getSigner()).address;
  let wallet = new Wallet(claimable.PrivateKey, browser);
  let forwarder = await getBiconomyForwarderConfig(80001);
  console.log(forwarder);

  let contractInterface = new Interface(abi);
  let functionSignature = contractInterface.encodeFunctionData("externalClaimNFT", [receiver, claimable.TokenContractAddress, claimable.TokenId]);
  let forwarderContract = new Contract(forwarder.address, forwarder.abi, wallet) as any;
  const batchNonce = await forwarderContract.getNonce(wallet.address, 0)
  const batchId = batchNonce;
  const to = '0x70cfAB34E61c0e0e463b000c4355B37Bbe321d39';
  const gasEstimate = await browser.estimateGas({
    to: to,
    from: wallet.address,
    data: functionSignature
  });
  const gasNum = Number(gasEstimate.toString(10));

  const request = await buildForwardTxRequest({
    account: wallet.address,
    to: to,
    gasLimitNum: gasNum,
    batchId,
    batchNonce,
    data: functionSignature
  })
  console.log(request);

  const hash = getDataToSignForPersonalSign(request);
  console.log(hash);
  let sig = await wallet.signMessage(hash);
  console.log(sig);
  await sendTransaction({
    userAddress: wallet.address,
    req: request,
    sig,
    signatureType: 'PERSONAL_SIGN'
  });

}

function parseFromString(str: string): Claimable {
  return JSON.parse(str);
}

function parseFromBase64String(str: string): Claimable {
  return parseFromString(Buffer.from(str, 'base64').toString('utf-8'));
}

export type {
  Claimable
}

export {
  parseFromString,
  parseFromBase64String,
  claimNFT
}

