import compiledFactory from "../ethereum/build/Factory.json" assert { type: "json" };
import { ethers } from 'ethers';
import getProvider from "./ethers";

async function createFactory(){
    const address = "0xc8879F18F579A7A34AdB712B98b68CE8754f1157";
    const signer = await getProvider();
    const factory = new ethers.Contract(address, compiledFactory.abi, signer);
    return factory;
}

export default createFactory;

