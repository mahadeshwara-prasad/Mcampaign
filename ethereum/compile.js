import fs from "fs-extra";
import path from "path";
import solc from "solc";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contract", "Campaign.sol");
const source = fs.readFileSync(campaignPath,"utf8");

const input = {
    language: "Solidity",
    sources: {
        "Campaign.sol":{
            content: source
        },
    },
    settings: {
        outputSelection: {
            "*":{
                "*":["*"],
            },
        },
    },     
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Campaign.sol"];

fs.ensureDirSync(buildPath);

for(let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath, contract + ".json"),
        output[contract]
    );
}