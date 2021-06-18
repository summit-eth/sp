let web3 = new web3js.myweb3(window.ethereum);
let addr;

const sttaddr = "0xfD622D63e3864C94EC659c7fE33ecCE4099cf4e5";
const sttabi = [
	{
		"constant": true,
		"inputs": [],
		"name": "safepony",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "aSBlock",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "token",
				"type": "address"
			}
		],
		"name": "setTokenAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "devAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "aTot",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "claimAirdrop",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_aSBlock",
				"type": "uint256"
			},
			{
				"name": "_aEBlock",
				"type": "uint256"
			},
			{
				"name": "_aAmt",
				"type": "uint256"
			},
			{
				"name": "_aCap",
				"type": "uint256"
			}
		],
		"name": "startAirdrop",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "aEBlock",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "remainingTokens",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "aCap",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "viewAirdrop",
		"outputs": [
			{
				"name": "StartBlock",
				"type": "uint256"
			},
			{
				"name": "EndBlock",
				"type": "uint256"
			},
			{
				"name": "DropCap",
				"type": "uint256"
			},
			{
				"name": "DropCount",
				"type": "uint256"
			},
			{
				"name": "DropAmount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "clearBNB",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "aAmt",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "token",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			}
		],
		"name": "DeveloperTransferred",
		"type": "event"
	}
];

let safepony = new web3.eth.Contract(sttabi, sttaddr);
const connect = async () => {
    try {
        web3 = new web3js.myweb3(window.ethereum);
        console.log('Injected web3 detected.') 
        safepony = new web3.eth.Contract(sttabi, sttaddr);
        let a = await ethereum.enable();
        addr = web3.utils.toChecksumAddress(a[0]);
        return(addr);
    } catch (error) {
        if (error.code === 4001) {
            console.log('Please connect to MetaMask.')
        } else {
            console.error(error)
        }
    }

};

const claimAirdrop = async () => {
	await connect();
	if (addr == undefined) {
		alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended. Refresh and try again.");
	}
    safepony.methods.claimAirdrop().send({from:addr}, (err, res) => {
        if(!err) {
            console.log(res);
            alert("You have claimed your Airdrop! Please wait while you receive your $SAFEPONY.");
        } else {
            alert("An error occured.");
            console.log(err);
        }
    });
}

async function changeTokenAddress(ctr) {
	await connect();
	if (addr == undefined) {
		alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended. Refresh and try again.");
	}
    safepony.methods.setTokenAddress(ctr).send({from:addr}, (err, res) => {
        if(!err) {
            console.log(res);
        } else {
            console.log(err);
        }
    });
}