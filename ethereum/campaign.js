import compiledCampaign from "../ethereum/build/Campaign.json" assert { type: "json" };
import { ethers } from 'ethers';
import getProvider from "./ethers";

async function campaign(address){
    const signer = await getProvider();
    return (new ethers.Contract(address, compiledCampaign.abi, signer));
}

export default campaign;