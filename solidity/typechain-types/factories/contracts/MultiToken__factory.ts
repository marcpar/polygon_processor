/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  MultiToken,
  MultiTokenInterface,
} from "../../contracts/MultiToken";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "externalMintNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "externalMintNFTTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "externalTransferNFTTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "revokeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenID",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506134ff806100206000396000f3fe608060405234801561001057600080fd5b50600436106100e95760003560e01c80634e1273f41161008c578063c4d66de811610066578063c4d66de814610256578063e985e9c514610272578063eee6d11c146102a2578063f242432a146102be576100e9565b80634e1273f4146101ee578063704b6c021461021e578063a22cb4651461023a576100e9565b80632d345670116100c85780632d3456701461017e5780632eb2c2d61461019a57806337cf2326146101b65780634afbecfe146101d2576100e9565b8062fdd58e146100ee57806301ffc9a71461011e5780630e89341c1461014e575b600080fd5b61010860048036038101906101039190611da2565b6102da565b6040516101159190611df1565b60405180910390f35b61013860048036038101906101339190611e64565b6103a3565b6040516101459190611eac565b60405180910390f35b61016860048036038101906101639190611ec7565b610485565b6040516101759190611f84565b60405180910390f35b61019860048036038101906101939190611fa6565b61052a565b005b6101b460048036038101906101af91906121d0565b610611565b005b6101d060048036038101906101cb91906122fa565b6106b2565b005b6101ec60048036038101906101e79190612347565b610754565b005b61020860048036038101906102039190612471565b610802565b60405161021591906125a7565b60405180910390f35b61023860048036038101906102339190611fa6565b61091b565b005b610254600480360381019061024f91906125f5565b610a01565b005b610270600480360381019061026b9190611fa6565b610a17565b005b61028c60048036038101906102879190612635565b610b61565b6040516102999190611eac565b60405180910390f35b6102bc60048036038101906102b79190612675565b610bf5565b005b6102d860048036038101906102d391906126d5565b610c91565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361034a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610341906127de565b60405180910390fd5b6098600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061046e57507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061047e575061047d82610d32565b5b9050919050565b606060cb600083815260200190815260200160002080546104a59061282d565b80601f01602080910402602001604051908101604052809291908181526020018280546104d19061282d565b801561051e5780601f106104f35761010080835404028352916020019161051e565b820191906000526020600020905b81548152906001019060200180831161050157829003601f168201915b50505050509050919050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166105b6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ad906128aa565b60405180910390fd5b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b610619610d9c565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061065f575061065e85610659610d9c565b610b61565b5b61069e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106959061293c565b60405180910390fd5b6106ab8585858585610da4565b5050505050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661073e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610735906128aa565b60405180910390fd5b610750828261074b610d9c565b6110c8565b5050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166107e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107d7906128aa565b60405180910390fd5b6107fc8484848460405180602001604052806000815250611125565b50505050565b60608151835114610848576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083f906129ce565b60405180910390fd5b6000835167ffffffffffffffff81111561086557610864611fd8565b5b6040519080825280602002602001820160405280156108935781602001602082028036833780820191505090505b50905060005b8451811015610910576108e08582815181106108b8576108b76129ee565b5b60200260200101518583815181106108d3576108d26129ee565b5b60200260200101516102da565b8282815181106108f3576108f26129ee565b5b6020026020010181815250508061090990612a4c565b9050610899565b508091505092915050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166109a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099e906128aa565b60405180910390fd5b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b610a13610a0c610d9c565b83836113c3565b5050565b60008060019054906101000a900460ff16159050808015610a485750600160008054906101000a900460ff1660ff16105b80610a755750610a573061152f565b158015610a745750600160008054906101000a900460ff1660ff16145b5b610ab4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aab90612b06565b60405180910390fd5b60016000806101000a81548160ff021916908360ff1602179055508015610af1576001600060016101000a81548160ff0219169083151502179055505b610afa82611552565b610b0460ca6116e0565b8015610b5d5760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024986001604051610b549190612b78565b60405180910390a15b5050565b6000609960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610c81576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c78906128aa565b60405180910390fd5b610c8c8383836110c8565b505050565b610c99610d9c565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161480610cdf5750610cde85610cd9610d9c565b610b61565b5b610d1e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d159061293c565b60405180910390fd5b610d2b8585858585611125565b5050505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b8151835114610de8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ddf90612c05565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610e57576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e4e90612c97565b60405180910390fd5b6000610e61610d9c565b9050610e718187878787876116ed565b60005b8451811015611025576000858281518110610e9257610e916129ee565b5b602002602001015190506000858381518110610eb157610eb06129ee565b5b6020026020010151905060006098600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610f53576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4a90612d29565b60405180910390fd5b8181036098600085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816098600085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461100a9190612d49565b925050819055505050508061101e90612a4c565b9050610e74565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb878760405161109c929190612d7d565b60405180910390a46110b28187878787876116f5565b6110c08187878787876116fd565b505050505050565b60006110d460ca6118d4565b90506110f282826001604051806020016040528060008152506118e2565b838360cb60008481526020019081526020016000209182611114929190612f61565b5061111f60ca611a93565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603611194576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161118b90612c97565b60405180910390fd5b600061119e610d9c565b905060006111ab85611aa9565b905060006111b885611aa9565b90506111c88389898585896116ed565b60006098600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905085811015611260576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161125790612d29565b60405180910390fd5b8581036098600089815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550856098600089815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546113179190612d49565b925050819055508773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628a8a604051611394929190613031565b60405180910390a46113aa848a8a86868a6116f5565b6113b8848a8a8a8a8a611b23565b505050505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611431576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611428906130cc565b60405180910390fd5b80609960008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516115229190611eac565b60405180910390a3505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60008060019054906101000a900460ff161590508080156115835750600160008054906101000a900460ff1660ff16105b806115b057506115923061152f565b1580156115af5750600160008054906101000a900460ff1660ff16145b5b6115ef576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115e690612b06565b60405180910390fd5b60016000806101000a81548160ff021916908360ff160217905550801561162c576001600060016101000a81548160ff0219169083151502179055505b60018060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555080156116dc5760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249860016040516116d39190612b78565b60405180910390a15b5050565b6000816000018190555050565b505050505050565b505050505050565b61171c8473ffffffffffffffffffffffffffffffffffffffff1661152f565b156118cc578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b8152600401611762959493929190613150565b6020604051808303816000875af192505050801561179e57506040513d601f19601f8201168201806040525081019061179b91906131cd565b60015b611843576117aa613207565b806308c379a00361180657506117be613229565b806117c95750611808565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117fd9190611f84565b60405180910390fd5b505b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161183a9061332b565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146118ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118c1906133bd565b60405180910390fd5b505b505050505050565b600081600001549050919050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603611951576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119489061344f565b60405180910390fd5b600061195b610d9c565b9050600061196885611aa9565b9050600061197585611aa9565b9050611986836000898585896116ed565b846098600088815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546119e69190612d49565b925050819055508673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628989604051611a64929190613031565b60405180910390a4611a7b836000898585896116f5565b611a8a83600089898989611b23565b50505050505050565b6001816000016000828254019250508190555050565b60606000600167ffffffffffffffff811115611ac857611ac7611fd8565b5b604051908082528060200260200182016040528015611af65781602001602082028036833780820191505090505b5090508281600081518110611b0e57611b0d6129ee565b5b60200260200101818152505080915050919050565b611b428473ffffffffffffffffffffffffffffffffffffffff1661152f565b15611cf2578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b8152600401611b8895949392919061346f565b6020604051808303816000875af1925050508015611bc457506040513d601f19601f82011682018060405250810190611bc191906131cd565b60015b611c6957611bd0613207565b806308c379a003611c2c5750611be4613229565b80611bef5750611c2e565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c239190611f84565b60405180910390fd5b505b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c609061332b565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611cf0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ce7906133bd565b60405180910390fd5b505b505050505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611d3982611d0e565b9050919050565b611d4981611d2e565b8114611d5457600080fd5b50565b600081359050611d6681611d40565b92915050565b6000819050919050565b611d7f81611d6c565b8114611d8a57600080fd5b50565b600081359050611d9c81611d76565b92915050565b60008060408385031215611db957611db8611d04565b5b6000611dc785828601611d57565b9250506020611dd885828601611d8d565b9150509250929050565b611deb81611d6c565b82525050565b6000602082019050611e066000830184611de2565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611e4181611e0c565b8114611e4c57600080fd5b50565b600081359050611e5e81611e38565b92915050565b600060208284031215611e7a57611e79611d04565b5b6000611e8884828501611e4f565b91505092915050565b60008115159050919050565b611ea681611e91565b82525050565b6000602082019050611ec16000830184611e9d565b92915050565b600060208284031215611edd57611edc611d04565b5b6000611eeb84828501611d8d565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611f2e578082015181840152602081019050611f13565b60008484015250505050565b6000601f19601f8301169050919050565b6000611f5682611ef4565b611f608185611eff565b9350611f70818560208601611f10565b611f7981611f3a565b840191505092915050565b60006020820190508181036000830152611f9e8184611f4b565b905092915050565b600060208284031215611fbc57611fbb611d04565b5b6000611fca84828501611d57565b91505092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61201082611f3a565b810181811067ffffffffffffffff8211171561202f5761202e611fd8565b5b80604052505050565b6000612042611cfa565b905061204e8282612007565b919050565b600067ffffffffffffffff82111561206e5761206d611fd8565b5b602082029050602081019050919050565b600080fd5b600061209761209284612053565b612038565b905080838252602082019050602084028301858111156120ba576120b961207f565b5b835b818110156120e357806120cf8882611d8d565b8452602084019350506020810190506120bc565b5050509392505050565b600082601f83011261210257612101611fd3565b5b8135612112848260208601612084565b91505092915050565b600080fd5b600067ffffffffffffffff82111561213b5761213a611fd8565b5b61214482611f3a565b9050602081019050919050565b82818337600083830152505050565b600061217361216e84612120565b612038565b90508281526020810184848401111561218f5761218e61211b565b5b61219a848285612151565b509392505050565b600082601f8301126121b7576121b6611fd3565b5b81356121c7848260208601612160565b91505092915050565b600080600080600060a086880312156121ec576121eb611d04565b5b60006121fa88828901611d57565b955050602061220b88828901611d57565b945050604086013567ffffffffffffffff81111561222c5761222b611d09565b5b612238888289016120ed565b935050606086013567ffffffffffffffff81111561225957612258611d09565b5b612265888289016120ed565b925050608086013567ffffffffffffffff81111561228657612285611d09565b5b612292888289016121a2565b9150509295509295909350565b600080fd5b60008083601f8401126122ba576122b9611fd3565b5b8235905067ffffffffffffffff8111156122d7576122d661229f565b5b6020830191508360018202830111156122f3576122f261207f565b5b9250929050565b6000806020838503121561231157612310611d04565b5b600083013567ffffffffffffffff81111561232f5761232e611d09565b5b61233b858286016122a4565b92509250509250929050565b6000806000806080858703121561236157612360611d04565b5b600061236f87828801611d57565b945050602061238087828801611d57565b935050604061239187828801611d8d565b92505060606123a287828801611d8d565b91505092959194509250565b600067ffffffffffffffff8211156123c9576123c8611fd8565b5b602082029050602081019050919050565b60006123ed6123e8846123ae565b612038565b905080838252602082019050602084028301858111156124105761240f61207f565b5b835b8181101561243957806124258882611d57565b845260208401935050602081019050612412565b5050509392505050565b600082601f83011261245857612457611fd3565b5b81356124688482602086016123da565b91505092915050565b6000806040838503121561248857612487611d04565b5b600083013567ffffffffffffffff8111156124a6576124a5611d09565b5b6124b285828601612443565b925050602083013567ffffffffffffffff8111156124d3576124d2611d09565b5b6124df858286016120ed565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61251e81611d6c565b82525050565b60006125308383612515565b60208301905092915050565b6000602082019050919050565b6000612554826124e9565b61255e81856124f4565b935061256983612505565b8060005b8381101561259a5781516125818882612524565b975061258c8361253c565b92505060018101905061256d565b5085935050505092915050565b600060208201905081810360008301526125c18184612549565b905092915050565b6125d281611e91565b81146125dd57600080fd5b50565b6000813590506125ef816125c9565b92915050565b6000806040838503121561260c5761260b611d04565b5b600061261a85828601611d57565b925050602061262b858286016125e0565b9150509250929050565b6000806040838503121561264c5761264b611d04565b5b600061265a85828601611d57565b925050602061266b85828601611d57565b9150509250929050565b60008060006040848603121561268e5761268d611d04565b5b600084013567ffffffffffffffff8111156126ac576126ab611d09565b5b6126b8868287016122a4565b935093505060206126cb86828701611d57565b9150509250925092565b600080600080600060a086880312156126f1576126f0611d04565b5b60006126ff88828901611d57565b955050602061271088828901611d57565b945050604061272188828901611d8d565b935050606061273288828901611d8d565b925050608086013567ffffffffffffffff81111561275357612752611d09565b5b61275f888289016121a2565b9150509295509295909350565b7f455243313135353a2061646472657373207a65726f206973206e6f742061207660008201527f616c6964206f776e657200000000000000000000000000000000000000000000602082015250565b60006127c8602a83611eff565b91506127d38261276c565b604082019050919050565b600060208201905081810360008301526127f7816127bb565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061284557607f821691505b602082108103612858576128576127fe565b5b50919050565b7f52657175697265732041646d696e000000000000000000000000000000000000600082015250565b6000612894600e83611eff565b915061289f8261285e565b602082019050919050565b600060208201905081810360008301526128c381612887565b9050919050565b7f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60008201527f6572206f7220617070726f766564000000000000000000000000000000000000602082015250565b6000612926602e83611eff565b9150612931826128ca565b604082019050919050565b6000602082019050818103600083015261295581612919565b9050919050565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b60006129b8602983611eff565b91506129c38261295c565b604082019050919050565b600060208201905081810360008301526129e7816129ab565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612a5782611d6c565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612a8957612a88612a1d565b5b600182019050919050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000612af0602e83611eff565b9150612afb82612a94565b604082019050919050565b60006020820190508181036000830152612b1f81612ae3565b9050919050565b6000819050919050565b600060ff82169050919050565b6000819050919050565b6000612b62612b5d612b5884612b26565b612b3d565b612b30565b9050919050565b612b7281612b47565b82525050565b6000602082019050612b8d6000830184612b69565b92915050565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b6000612bef602883611eff565b9150612bfa82612b93565b604082019050919050565b60006020820190508181036000830152612c1e81612be2565b9050919050565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000612c81602583611eff565b9150612c8c82612c25565b604082019050919050565b60006020820190508181036000830152612cb081612c74565b9050919050565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b6000612d13602a83611eff565b9150612d1e82612cb7565b604082019050919050565b60006020820190508181036000830152612d4281612d06565b9050919050565b6000612d5482611d6c565b9150612d5f83611d6c565b9250828201905080821115612d7757612d76612a1d565b5b92915050565b60006040820190508181036000830152612d978185612549565b90508181036020830152612dab8184612549565b90509392505050565b600082905092915050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302612e217fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612de4565b612e2b8683612de4565b95508019841693508086168417925050509392505050565b6000612e5e612e59612e5484611d6c565b612b3d565b611d6c565b9050919050565b6000819050919050565b612e7883612e43565b612e8c612e8482612e65565b848454612df1565b825550505050565b600090565b612ea1612e94565b612eac818484612e6f565b505050565b5b81811015612ed057612ec5600082612e99565b600181019050612eb2565b5050565b601f821115612f1557612ee681612dbf565b612eef84612dd4565b81016020851015612efe578190505b612f12612f0a85612dd4565b830182612eb1565b50505b505050565b600082821c905092915050565b6000612f3860001984600802612f1a565b1980831691505092915050565b6000612f518383612f27565b9150826002028217905092915050565b612f6b8383612db4565b67ffffffffffffffff811115612f8457612f83611fd8565b5b612f8e825461282d565b612f99828285612ed4565b6000601f831160018114612fc85760008415612fb6578287013590505b612fc08582612f45565b865550613028565b601f198416612fd686612dbf565b60005b82811015612ffe57848901358255600182019150602085019450602081019050612fd9565b8683101561301b5784890135613017601f891682612f27565b8355505b6001600288020188555050505b50505050505050565b60006040820190506130466000830185611de2565b6130536020830184611de2565b9392505050565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b60006130b6602983611eff565b91506130c18261305a565b604082019050919050565b600060208201905081810360008301526130e5816130a9565b9050919050565b6130f581611d2e565b82525050565b600081519050919050565b600082825260208201905092915050565b6000613122826130fb565b61312c8185613106565b935061313c818560208601611f10565b61314581611f3a565b840191505092915050565b600060a08201905061316560008301886130ec565b61317260208301876130ec565b81810360408301526131848186612549565b905081810360608301526131988185612549565b905081810360808301526131ac8184613117565b90509695505050505050565b6000815190506131c781611e38565b92915050565b6000602082840312156131e3576131e2611d04565b5b60006131f1848285016131b8565b91505092915050565b60008160e01c9050919050565b600060033d11156132265760046000803e6132236000516131fa565b90505b90565b600060443d106132b65761323b611cfa565b60043d036004823e80513d602482011167ffffffffffffffff821117156132635750506132b6565b808201805167ffffffffffffffff81111561328157505050506132b6565b80602083010160043d03850181111561329e5750505050506132b6565b6132ad82602001850186612007565b82955050505050505b90565b7f455243313135353a207472616e7366657220746f206e6f6e2d4552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b6000613315603483611eff565b9150613320826132b9565b604082019050919050565b6000602082019050818103600083015261334481613308565b9050919050565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b60006133a7602883611eff565b91506133b28261334b565b604082019050919050565b600060208201905081810360008301526133d68161339a565b9050919050565b7f455243313135353a206d696e7420746f20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b6000613439602183611eff565b9150613444826133dd565b604082019050919050565b600060208201905081810360008301526134688161342c565b9050919050565b600060a08201905061348460008301886130ec565b61349160208301876130ec565b61349e6040830186611de2565b6134ab6060830185611de2565b81810360808301526134bd8184613117565b9050969550505050505056fea2646970667358221220f48385fd8f96f25d298c862cf7948882ff524aa78f2cc1032c9002fa7a51074564736f6c63430008110033";

type MultiTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MultiTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MultiToken__factory extends ContractFactory {
  constructor(...args: MultiTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MultiToken> {
    return super.deploy(overrides || {}) as Promise<MultiToken>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MultiToken {
    return super.attach(address) as MultiToken;
  }
  override connect(signer: Signer): MultiToken__factory {
    return super.connect(signer) as MultiToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MultiTokenInterface {
    return new utils.Interface(_abi) as MultiTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MultiToken {
    return new Contract(address, _abi, signerOrProvider) as MultiToken;
  }
}
