import { readFile } from 'fs/promises';
const compiledFactory = JSON.parse(
    await readFile(
      new URL('./build/Factory.json', import.meta.url)
    )
);
import {ethers} from "ethers";

const provider = ethers.getDefaultProvider("https://sepolia.infura.io/v3/52b0e6f5c3c546f0a92fe3adb34f21c4");

const privatekey = "Your private key";

const wallet = new ethers.Wallet(privatekey,provider);

async function deployFactory(){

    console.log("Attepmting to deploy contract from account ",wallet.address);

    const contract = new ethers.ContractFactory(compiledFactory.abi,compiledFactory.evm.bytecode.object,wallet);
    const factory = await contract.deploy();

    console.log("Contract Deployed at ",await factory.getAddress());
    
}

deployFactory();
