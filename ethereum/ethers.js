import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider';

async function getProvider(){
    let provider,signer;
    if(typeof window == null && typeof window.ethereum == null) {

        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider("Enter your provider here");
        signer = await provider.getSigner();
    } else {
        
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        
    }
    return signer;

}

export default getProvider;
