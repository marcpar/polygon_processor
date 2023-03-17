/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { GasToken, GasTokenInterface } from "../../contracts/GasToken";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "CALL_DENIED",
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
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "externalBurnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "externalMintTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
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
    inputs: [],
    name: "name",
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
    inputs: [],
    name: "symbol",
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
  {
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50612887806100206000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80634cd75ad011610097578063a457c2d711610066578063a457c2d7146102ad578063a9059cbb146102dd578063b22cc4b51461030d578063dd62ed3e1461032957610100565b80634cd75ad014610227578063704b6c021461024357806370a082311461025f57806395d89b411461028f57610100565b806323b872dd116100d357806323b872dd1461018d5780632d345670146101bd578063313ce567146101d957806339509351146101f757610100565b806306fdde0314610105578063077f224a14610123578063095ea7b31461013f57806318160ddd1461016f575b600080fd5b61010d610359565b60405161011a9190611999565b60405180910390f35b61013d60048036038101906101389190611a88565b6103eb565b005b61015960048036038101906101549190611b53565b6105c1565b6040516101669190611bae565b60405180910390f35b6101776105e4565b6040516101849190611bd8565b60405180910390f35b6101a760048036038101906101a29190611bf3565b6105ee565b6040516101b49190611bae565b60405180910390f35b6101d760048036038101906101d29190611c46565b61061d565b005b6101e16107cf565b6040516101ee9190611c8f565b60405180910390f35b610211600480360381019061020c9190611b53565b6107d4565b60405161021e9190611bae565b60405180910390f35b610241600480360381019061023c9190611b53565b61080b565b005b61025d60048036038101906102589190611c46565b610970565b005b61027960048036038101906102749190611c46565b610b21565b6040516102869190611bd8565b60405180910390f35b610297610b6a565b6040516102a49190611999565b60405180910390f35b6102c760048036038101906102c29190611b53565b610bfc565b6040516102d49190611bae565b60405180910390f35b6102f760048036038101906102f29190611b53565b610c73565b6040516103049190611bae565b60405180910390f35b61032760048036038101906103229190611b53565b610c96565b005b610343600480360381019061033e9190611caa565b610dfb565b6040516103509190611bd8565b60405180910390f35b60606069805461036890611d19565b80601f016020809104026020016040519081016040528092919081815260200182805461039490611d19565b80156103e15780601f106103b6576101008083540402835291602001916103e1565b820191906000526020600020905b8154815290600101906020018083116103c457829003601f168201915b5050505050905090565b60008060019054906101000a900460ff1615905080801561041c5750600160008054906101000a900460ff1660ff16105b80610449575061042b30610e82565b1580156104485750600160008054906101000a900460ff1660ff16145b5b610488576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161047f90611dbc565b60405180910390fd5b60016000806101000a81548160ff021916908360ff16021790555080156104c5576001600060016101000a81548160ff0219169083151502179055505b61055786868080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050610ea5565b61056082610f02565b80156105b95760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249860016040516105b09190611e21565b60405180910390a15b505050505050565b6000806105cc611090565b90506105d9818585611098565b600191505092915050565b6000606854905090565b6000806105f9611090565b9050610606858285611261565b6106118585856112ed565b60019150509392505050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166106a6577fe3a10771a07da029a0fa1d3587ba330cb8fd05336e561d6e017e9f5346b796823360405161069d9190611e4b565b60405180910390a15b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16336040516020016107049190611eae565b6040516020818303038152906040526040516020016107239190611f2b565b60405160208183030381529060405290610773576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161076a9190611999565b60405180910390fd5b506000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600090565b6000806107df611090565b90506108008185856107f18589610dfb565b6107fb9190611f80565b611098565b600191505092915050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610894577fe3a10771a07da029a0fa1d3587ba330cb8fd05336e561d6e017e9f5346b796823360405161088b9190611e4b565b60405180910390a15b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16336040516020016108f29190611eae565b6040516020818303038152906040526040516020016109119190611f2b565b60405160208183030381529060405290610961576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109589190611999565b60405180910390fd5b5061096c8282611566565b5050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166109f9577fe3a10771a07da029a0fa1d3587ba330cb8fd05336e561d6e017e9f5346b79682336040516109f09190611e4b565b60405180910390a15b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1633604051602001610a579190611eae565b604051602081830303815290604052604051602001610a769190611f2b565b60405160208183030381529060405290610ac6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610abd9190611999565b60405180910390fd5b5060018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6000606660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060606a8054610b7990611d19565b80601f0160208091040260200160405190810160405280929190818152602001828054610ba590611d19565b8015610bf25780601f10610bc757610100808354040283529160200191610bf2565b820191906000526020600020905b815481529060010190602001808311610bd557829003601f168201915b5050505050905090565b600080610c07611090565b90506000610c158286610dfb565b905083811015610c5a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c5190612026565b60405180910390fd5b610c678286868403611098565b60019250505092915050565b600080610c7e611090565b9050610c8b8185856112ed565b600191505092915050565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610d1f577fe3a10771a07da029a0fa1d3587ba330cb8fd05336e561d6e017e9f5346b7968233604051610d169190611e4b565b60405180910390a15b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1633604051602001610d7d9190611eae565b604051602081830303815290604052604051602001610d9c9190611f2b565b60405160208183030381529060405290610dec576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610de39190611999565b60405180910390fd5b50610df78282611735565b5050565b6000606760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff16610ef4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eeb906120b8565b60405180910390fd5b610efe828261188c565b5050565b60008060019054906101000a900460ff16159050808015610f335750600160008054906101000a900460ff1660ff16105b80610f605750610f4230610e82565b158015610f5f5750600160008054906101000a900460ff1660ff16145b5b610f9f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f9690611dbc565b60405180910390fd5b60016000806101000a81548160ff021916908360ff1602179055508015610fdc576001600060016101000a81548160ff0219169083151502179055505b60018060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550801561108c5760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249860016040516110839190611e21565b60405180910390a15b5050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611107576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110fe9061214a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611176576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161116d906121dc565b60405180910390fd5b80606760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516112549190611bd8565b60405180910390a3505050565b600061126d8484610dfb565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146112e757818110156112d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112d090612248565b60405180910390fd5b6112e68484848403611098565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361135c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611353906122da565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036113cb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113c29061236c565b60405180910390fd5b6113d68383836118ff565b6000606660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561145d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611454906123fe565b60405180910390fd5b818103606660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081606660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161154d9190611bd8565b60405180910390a3611560848484611904565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036115d5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115cc90612490565b60405180910390fd5b6115e1826000836118ff565b6000606660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611668576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161165f90612522565b60405180910390fd5b818103606660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081606860008282540392505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161171c9190611bd8565b60405180910390a361173083600084611904565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036117a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161179b9061258e565b60405180910390fd5b6117b0600083836118ff565b80606860008282546117c29190611f80565b9250508190555080606660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516118749190611bd8565b60405180910390a361188860008383611904565b5050565b600060019054906101000a900460ff166118db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118d2906120b8565b60405180910390fd5b81606990816118ea919061277f565b5080606a90816118fa919061277f565b505050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611943578082015181840152602081019050611928565b60008484015250505050565b6000601f19601f8301169050919050565b600061196b82611909565b6119758185611914565b9350611985818560208601611925565b61198e8161194f565b840191505092915050565b600060208201905081810360008301526119b38184611960565b905092915050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f8401126119ea576119e96119c5565b5b8235905067ffffffffffffffff811115611a0757611a066119ca565b5b602083019150836001820283011115611a2357611a226119cf565b5b9250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611a5582611a2a565b9050919050565b611a6581611a4a565b8114611a7057600080fd5b50565b600081359050611a8281611a5c565b92915050565b600080600080600060608688031215611aa457611aa36119bb565b5b600086013567ffffffffffffffff811115611ac257611ac16119c0565b5b611ace888289016119d4565b9550955050602086013567ffffffffffffffff811115611af157611af06119c0565b5b611afd888289016119d4565b93509350506040611b1088828901611a73565b9150509295509295909350565b6000819050919050565b611b3081611b1d565b8114611b3b57600080fd5b50565b600081359050611b4d81611b27565b92915050565b60008060408385031215611b6a57611b696119bb565b5b6000611b7885828601611a73565b9250506020611b8985828601611b3e565b9150509250929050565b60008115159050919050565b611ba881611b93565b82525050565b6000602082019050611bc36000830184611b9f565b92915050565b611bd281611b1d565b82525050565b6000602082019050611bed6000830184611bc9565b92915050565b600080600060608486031215611c0c57611c0b6119bb565b5b6000611c1a86828701611a73565b9350506020611c2b86828701611a73565b9250506040611c3c86828701611b3e565b9150509250925092565b600060208284031215611c5c57611c5b6119bb565b5b6000611c6a84828501611a73565b91505092915050565b600060ff82169050919050565b611c8981611c73565b82525050565b6000602082019050611ca46000830184611c80565b92915050565b60008060408385031215611cc157611cc06119bb565b5b6000611ccf85828601611a73565b9250506020611ce085828601611a73565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611d3157607f821691505b602082108103611d4457611d43611cea565b5b50919050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000611da6602e83611914565b9150611db182611d4a565b604082019050919050565b60006020820190508181036000830152611dd581611d99565b9050919050565b6000819050919050565b6000819050919050565b6000611e0b611e06611e0184611ddc565b611de6565b611c73565b9050919050565b611e1b81611df0565b82525050565b6000602082019050611e366000830184611e12565b92915050565b611e4581611a4a565b82525050565b6000602082019050611e606000830184611e3c565b92915050565b60008160601b9050919050565b6000611e7e82611e66565b9050919050565b6000611e9082611e73565b9050919050565b611ea8611ea382611a4a565b611e85565b82525050565b6000611eba8284611e97565b60148201915081905092915050565b7f52657175697265732041646d696e3a2000000000000000000000000000000000815250565b600081905092915050565b6000611f0582611909565b611f0f8185611eef565b9350611f1f818560208601611925565b80840191505092915050565b6000611f3682611ec9565b601082019150611f468284611efa565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611f8b82611b1d565b9150611f9683611b1d565b9250828201905080821115611fae57611fad611f51565b5b92915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b6000612010602583611914565b915061201b82611fb4565b604082019050919050565b6000602082019050818103600083015261203f81612003565b9050919050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b60006120a2602b83611914565b91506120ad82612046565b604082019050919050565b600060208201905081810360008301526120d181612095565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000612134602483611914565b915061213f826120d8565b604082019050919050565b6000602082019050818103600083015261216381612127565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b60006121c6602283611914565b91506121d18261216a565b604082019050919050565b600060208201905081810360008301526121f5816121b9565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b6000612232601d83611914565b915061223d826121fc565b602082019050919050565b6000602082019050818103600083015261226181612225565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b60006122c4602583611914565b91506122cf82612268565b604082019050919050565b600060208201905081810360008301526122f3816122b7565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b6000612356602383611914565b9150612361826122fa565b604082019050919050565b6000602082019050818103600083015261238581612349565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b60006123e8602683611914565b91506123f38261238c565b604082019050919050565b60006020820190508181036000830152612417816123db565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b600061247a602183611914565b91506124858261241e565b604082019050919050565b600060208201905081810360008301526124a98161246d565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b600061250c602283611914565b9150612517826124b0565b604082019050919050565b6000602082019050818103600083015261253b816124ff565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000612578601f83611914565b915061258382612542565b602082019050919050565b600060208201905081810360008301526125a78161256b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261263f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612602565b6126498683612602565b95508019841693508086168417925050509392505050565b600061267c61267761267284611b1d565b611de6565b611b1d565b9050919050565b6000819050919050565b61269683612661565b6126aa6126a282612683565b84845461260f565b825550505050565b600090565b6126bf6126b2565b6126ca81848461268d565b505050565b5b818110156126ee576126e36000826126b7565b6001810190506126d0565b5050565b601f82111561273357612704816125dd565b61270d846125f2565b8101602085101561271c578190505b612730612728856125f2565b8301826126cf565b50505b505050565b600082821c905092915050565b600061275660001984600802612738565b1980831691505092915050565b600061276f8383612745565b9150826002028217905092915050565b61278882611909565b67ffffffffffffffff8111156127a1576127a06125ae565b5b6127ab8254611d19565b6127b68282856126f2565b600060209050601f8311600181146127e957600084156127d7578287015190505b6127e18582612763565b865550612849565b601f1984166127f7866125dd565b60005b8281101561281f578489015182556001820191506020850194506020810190506127fa565b8683101561283c5784890151612838601f891682612745565b8355505b6001600288020188555050505b50505050505056fea26469706673582212201dcf54e9a24c089b0694f08791812a35a8387ba93d37e4ac3bc0384e22d5177c64736f6c63430008110033";

type GasTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GasTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GasToken__factory extends ContractFactory {
  constructor(...args: GasTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GasToken> {
    return super.deploy(overrides || {}) as Promise<GasToken>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): GasToken {
    return super.attach(address) as GasToken;
  }
  override connect(signer: Signer): GasToken__factory {
    return super.connect(signer) as GasToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GasTokenInterface {
    return new utils.Interface(_abi) as GasTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GasToken {
    return new Contract(address, _abi, signerOrProvider) as GasToken;
  }
}
