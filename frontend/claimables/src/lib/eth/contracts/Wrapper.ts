import { ContractRunner, Contract, InterfaceAbi } from "ethers";

/**
 * 
 */
abstract class Wrapper {
    protected _contract!: Contract;
    constructor(address: string, abi: InterfaceAbi, runner?: ContractRunner) {
        this._contract = new Contract(address, abi, runner);
    }

    public contract(): Contract {
        return this._contract;
    }
}

export {
    Wrapper
}