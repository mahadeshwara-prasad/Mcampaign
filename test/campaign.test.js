//Downgrade ether.js version to 5.7.2 before running this test ^6.8.0
import assert from "assert";
import ganache from "ganache";
import {ethers} from "ethers";

const gan = ganache.provider();
// const account = await gan.request({ method: "eth_accounts", params: [] });
const provider = new ethers.providers.Web3Provider(gan);

import compiledFactory from "../ethereum/build/Factory.json" assert { type: "json" };
import compiledCampaign from "../ethereum/build/Campaign.json" assert { type: "json" };

let signer;
let signer1;
let accounts;
let factory;
let campaignAddr;
let campaign;
let campaignFactory;
let test;

beforeEach(async ()=>{
    accounts = await gan.request({ method: "eth_accounts", params: [] });
    signer= provider.getSigner(accounts[0]);
    factory = new ethers.ContractFactory(compiledFactory.abi,compiledFactory.evm.bytecode.object,signer);
    campaignFactory = await factory.deploy();
    signer1= provider.getSigner(accounts[1]);
    await campaignFactory.connect(signer1).createCampaign("Sharewise","1");
    [campaignAddr] = await campaignFactory.getDeployedContract();
    test = await campaignFactory.getDeployedContract();
    console.log("Share",test);
    campaign = new ethers.Contract(campaignAddr,compiledCampaign.abi,signer1);
});

describe("Camaign Test",()=>{
    it("Facatory Deployed?", ()=>{
        assert.ok(campaignFactory.address);
    });
    it("Campaign Deployed?", ()=>{
        assert.ok(campaign.address);
    });
    it("Who is Manager",async ()=>{
        console.log("acc",signer1._address);
        const manager = await campaign.manager();
        console.log("manager",manager);
        assert(manager === signer1._address);
    });
    it("End to End test", async ()=>{
        const signer2= provider.getSigner(accounts[2]);
        await campaign.contribute({value: ethers.utils.parseEther("2")});
        const contri = (await campaign.approversCount()).toNumber();
        const appr = await campaign.approvers(accounts[1]);
        console.log((await provider.getBalance(campaignAddr)).toString());
        console.log(appr);
        console.log("Contrii: ",contri);
        assert(contri=="1");
    });

})