import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider';

async function getProvider(){
    let provider,signer;
    if(typeof window == null && typeof window.ethereum == null) {

        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider("https://sepolia.infura.io/v3/52b0e6f5c3c546f0a92fe3adb34f21c4");
        signer = await provider.getSigner();
    } else {
        //provider = ethers.getDefaultProvider("https://sepolia.infura.io/v3/52b0e6f5c3c546f0a92fe3adb34f21c4");
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        
    }
    return signer;

}

export default getProvider;