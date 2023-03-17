/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ERC1155Upgradeable,
  ERC1155UpgradeableInterface,
} from "../../../../../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable";

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
        name: "",
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
  "0x608060405234801561001057600080fd5b506124fe806100206000396000f3fe608060405234801561001057600080fd5b50600436106100875760003560e01c80634e1273f41161005b5780634e1273f414610138578063a22cb46514610168578063e985e9c514610184578063f242432a146101b457610087565b8062fdd58e1461008c57806301ffc9a7146100bc5780630e89341c146100ec5780632eb2c2d61461011c575b600080fd5b6100a660048036038101906100a191906113b7565b6101d0565b6040516100b39190611406565b60405180910390f35b6100d660048036038101906100d19190611479565b610299565b6040516100e391906114c1565b60405180910390f35b610106600480360381019061010191906114dc565b61037b565b6040516101139190611599565b60405180910390f35b610136600480360381019061013191906117b8565b61040f565b005b610152600480360381019061014d919061194a565b6104b0565b60405161015f9190611a80565b60405180910390f35b610182600480360381019061017d9190611ace565b6105c9565b005b61019e60048036038101906101999190611b0e565b6105df565b6040516101ab91906114c1565b60405180910390f35b6101ce60048036038101906101c99190611b4e565b610673565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610240576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023790611c57565b60405180910390fd5b6065600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061036457507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610374575061037382610714565b5b9050919050565b60606067805461038a90611ca6565b80601f01602080910402602001604051908101604052809291908181526020018280546103b690611ca6565b80156104035780601f106103d857610100808354040283529160200191610403565b820191906000526020600020905b8154815290600101906020018083116103e657829003601f168201915b50505050509050919050565b61041761077e565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061045d575061045c8561045761077e565b6105df565b5b61049c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049390611d49565b60405180910390fd5b6104a98585858585610786565b5050505050565b606081518351146104f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ed90611ddb565b60405180910390fd5b6000835167ffffffffffffffff811115610513576105126115c0565b5b6040519080825280602002602001820160405280156105415781602001602082028036833780820191505090505b50905060005b84518110156105be5761058e85828151811061056657610565611dfb565b5b602002602001015185838151811061058157610580611dfb565b5b60200260200101516101d0565b8282815181106105a1576105a0611dfb565b5b602002602001018181525050806105b790611e59565b9050610547565b508091505092915050565b6105db6105d461077e565b8383610aaa565b5050565b6000606660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b61067b61077e565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614806106c157506106c0856106bb61077e565b6105df565b5b610700576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106f790611d49565b60405180910390fd5b61070d8585858585610c16565b5050505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b81518351146107ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c190611f13565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610839576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083090611fa5565b60405180910390fd5b600061084361077e565b9050610853818787878787610eb4565b60005b8451811015610a0757600085828151811061087457610873611dfb565b5b60200260200101519050600085838151811061089357610892611dfb565b5b6020026020010151905060006065600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610935576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092c90612037565b60405180910390fd5b8181036065600085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816065600085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109ec9190612057565b9250508190555050505080610a0090611e59565b9050610856565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610a7e92919061208b565b60405180910390a4610a94818787878787610ebc565b610aa2818787878787610ec4565b505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610b18576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0f90612134565b60405180910390fd5b80606660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610c0991906114c1565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610c85576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7c90611fa5565b60405180910390fd5b6000610c8f61077e565b90506000610c9c8561109b565b90506000610ca98561109b565b9050610cb9838989858589610eb4565b60006065600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905085811015610d51576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d4890612037565b60405180910390fd5b8581036065600089815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550856065600089815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e089190612057565b925050819055508773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628a8a604051610e85929190612154565b60405180910390a4610e9b848a8a86868a610ebc565b610ea9848a8a8a8a8a611115565b505050505050505050565b505050505050565b505050505050565b610ee38473ffffffffffffffffffffffffffffffffffffffff166112ec565b15611093578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b8152600401610f299594939291906121e1565b6020604051808303816000875af1925050508015610f6557506040513d601f19601f82011682018060405250810190610f62919061225e565b60015b61100a57610f71612298565b806308c379a003610fcd5750610f856122ba565b80610f905750610fcf565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fc49190611599565b60405180910390fd5b505b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611001906123bc565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611091576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110889061244e565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff8111156110ba576110b96115c0565b5b6040519080825280602002602001820160405280156110e85781602001602082028036833780820191505090505b5090508281600081518110611100576110ff611dfb565b5b60200260200101818152505080915050919050565b6111348473ffffffffffffffffffffffffffffffffffffffff166112ec565b156112e4578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b815260040161117a95949392919061246e565b6020604051808303816000875af19250505080156111b657506040513d601f19601f820116820180604052508101906111b3919061225e565b60015b61125b576111c2612298565b806308c379a00361121e57506111d66122ba565b806111e15750611220565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112159190611599565b60405180910390fd5b505b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611252906123bc565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146112e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112d99061244e565b60405180910390fd5b505b505050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061134e82611323565b9050919050565b61135e81611343565b811461136957600080fd5b50565b60008135905061137b81611355565b92915050565b6000819050919050565b61139481611381565b811461139f57600080fd5b50565b6000813590506113b18161138b565b92915050565b600080604083850312156113ce576113cd611319565b5b60006113dc8582860161136c565b92505060206113ed858286016113a2565b9150509250929050565b61140081611381565b82525050565b600060208201905061141b60008301846113f7565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61145681611421565b811461146157600080fd5b50565b6000813590506114738161144d565b92915050565b60006020828403121561148f5761148e611319565b5b600061149d84828501611464565b91505092915050565b60008115159050919050565b6114bb816114a6565b82525050565b60006020820190506114d660008301846114b2565b92915050565b6000602082840312156114f2576114f1611319565b5b6000611500848285016113a2565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611543578082015181840152602081019050611528565b60008484015250505050565b6000601f19601f8301169050919050565b600061156b82611509565b6115758185611514565b9350611585818560208601611525565b61158e8161154f565b840191505092915050565b600060208201905081810360008301526115b38184611560565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6115f88261154f565b810181811067ffffffffffffffff82111715611617576116166115c0565b5b80604052505050565b600061162a61130f565b905061163682826115ef565b919050565b600067ffffffffffffffff821115611656576116556115c0565b5b602082029050602081019050919050565b600080fd5b600061167f61167a8461163b565b611620565b905080838252602082019050602084028301858111156116a2576116a1611667565b5b835b818110156116cb57806116b788826113a2565b8452602084019350506020810190506116a4565b5050509392505050565b600082601f8301126116ea576116e96115bb565b5b81356116fa84826020860161166c565b91505092915050565b600080fd5b600067ffffffffffffffff821115611723576117226115c0565b5b61172c8261154f565b9050602081019050919050565b82818337600083830152505050565b600061175b61175684611708565b611620565b90508281526020810184848401111561177757611776611703565b5b611782848285611739565b509392505050565b600082601f83011261179f5761179e6115bb565b5b81356117af848260208601611748565b91505092915050565b600080600080600060a086880312156117d4576117d3611319565b5b60006117e28882890161136c565b95505060206117f38882890161136c565b945050604086013567ffffffffffffffff8111156118145761181361131e565b5b611820888289016116d5565b935050606086013567ffffffffffffffff8111156118415761184061131e565b5b61184d888289016116d5565b925050608086013567ffffffffffffffff81111561186e5761186d61131e565b5b61187a8882890161178a565b9150509295509295909350565b600067ffffffffffffffff8211156118a2576118a16115c0565b5b602082029050602081019050919050565b60006118c66118c184611887565b611620565b905080838252602082019050602084028301858111156118e9576118e8611667565b5b835b8181101561191257806118fe888261136c565b8452602084019350506020810190506118eb565b5050509392505050565b600082601f830112611931576119306115bb565b5b81356119418482602086016118b3565b91505092915050565b6000806040838503121561196157611960611319565b5b600083013567ffffffffffffffff81111561197f5761197e61131e565b5b61198b8582860161191c565b925050602083013567ffffffffffffffff8111156119ac576119ab61131e565b5b6119b8858286016116d5565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6119f781611381565b82525050565b6000611a0983836119ee565b60208301905092915050565b6000602082019050919050565b6000611a2d826119c2565b611a3781856119cd565b9350611a42836119de565b8060005b83811015611a73578151611a5a88826119fd565b9750611a6583611a15565b925050600181019050611a46565b5085935050505092915050565b60006020820190508181036000830152611a9a8184611a22565b905092915050565b611aab816114a6565b8114611ab657600080fd5b50565b600081359050611ac881611aa2565b92915050565b60008060408385031215611ae557611ae4611319565b5b6000611af38582860161136c565b9250506020611b0485828601611ab9565b9150509250929050565b60008060408385031215611b2557611b24611319565b5b6000611b338582860161136c565b9250506020611b448582860161136c565b9150509250929050565b600080600080600060a08688031215611b6a57611b69611319565b5b6000611b788882890161136c565b9550506020611b898882890161136c565b9450506040611b9a888289016113a2565b9350506060611bab888289016113a2565b925050608086013567ffffffffffffffff811115611bcc57611bcb61131e565b5b611bd88882890161178a565b9150509295509295909350565b7f455243313135353a2061646472657373207a65726f206973206e6f742061207660008201527f616c6964206f776e657200000000000000000000000000000000000000000000602082015250565b6000611c41602a83611514565b9150611c4c82611be5565b604082019050919050565b60006020820190508181036000830152611c7081611c34565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611cbe57607f821691505b602082108103611cd157611cd0611c77565b5b50919050565b7f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60008201527f6572206f7220617070726f766564000000000000000000000000000000000000602082015250565b6000611d33602e83611514565b9150611d3e82611cd7565b604082019050919050565b60006020820190508181036000830152611d6281611d26565b9050919050565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b6000611dc5602983611514565b9150611dd082611d69565b604082019050919050565b60006020820190508181036000830152611df481611db8565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611e6482611381565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611e9657611e95611e2a565b5b600182019050919050565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b6000611efd602883611514565b9150611f0882611ea1565b604082019050919050565b60006020820190508181036000830152611f2c81611ef0565b9050919050565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000611f8f602583611514565b9150611f9a82611f33565b604082019050919050565b60006020820190508181036000830152611fbe81611f82565b9050919050565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b6000612021602a83611514565b915061202c82611fc5565b604082019050919050565b6000602082019050818103600083015261205081612014565b9050919050565b600061206282611381565b915061206d83611381565b925082820190508082111561208557612084611e2a565b5b92915050565b600060408201905081810360008301526120a58185611a22565b905081810360208301526120b98184611a22565b90509392505050565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b600061211e602983611514565b9150612129826120c2565b604082019050919050565b6000602082019050818103600083015261214d81612111565b9050919050565b600060408201905061216960008301856113f7565b61217660208301846113f7565b9392505050565b61218681611343565b82525050565b600081519050919050565b600082825260208201905092915050565b60006121b38261218c565b6121bd8185612197565b93506121cd818560208601611525565b6121d68161154f565b840191505092915050565b600060a0820190506121f6600083018861217d565b612203602083018761217d565b81810360408301526122158186611a22565b905081810360608301526122298185611a22565b9050818103608083015261223d81846121a8565b90509695505050505050565b6000815190506122588161144d565b92915050565b60006020828403121561227457612273611319565b5b600061228284828501612249565b91505092915050565b60008160e01c9050919050565b600060033d11156122b75760046000803e6122b460005161228b565b90505b90565b600060443d10612347576122cc61130f565b60043d036004823e80513d602482011167ffffffffffffffff821117156122f4575050612347565b808201805167ffffffffffffffff8111156123125750505050612347565b80602083010160043d03850181111561232f575050505050612347565b61233e826020018501866115ef565b82955050505050505b90565b7f455243313135353a207472616e7366657220746f206e6f6e2d4552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b60006123a6603483611514565b91506123b18261234a565b604082019050919050565b600060208201905081810360008301526123d581612399565b9050919050565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b6000612438602883611514565b9150612443826123dc565b604082019050919050565b600060208201905081810360008301526124678161242b565b9050919050565b600060a082019050612483600083018861217d565b612490602083018761217d565b61249d60408301866113f7565b6124aa60608301856113f7565b81810360808301526124bc81846121a8565b9050969550505050505056fea2646970667358221220b38d45bbf8f0edb0b7a9c151ca922f15e53625533ea6b7b82cec4f82a224cc1564736f6c63430008110033";

type ERC1155UpgradeableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155UpgradeableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155Upgradeable__factory extends ContractFactory {
  constructor(...args: ERC1155UpgradeableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC1155Upgradeable> {
    return super.deploy(overrides || {}) as Promise<ERC1155Upgradeable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC1155Upgradeable {
    return super.attach(address) as ERC1155Upgradeable;
  }
  override connect(signer: Signer): ERC1155Upgradeable__factory {
    return super.connect(signer) as ERC1155Upgradeable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155UpgradeableInterface {
    return new utils.Interface(_abi) as ERC1155UpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155Upgradeable {
    return new Contract(address, _abi, signerOrProvider) as ERC1155Upgradeable;
  }
}
