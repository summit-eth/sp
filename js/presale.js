let web3 = new web3js.myweb3(window.ethereum);
let addr;

const sttaddr = "0xaB77B548D6C347C198AeD569dDB10da2F43215B2";
const sttabi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
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
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
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
				"name": "sender",
				"type": "address"
			},
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
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
				"name": "spender",
				"type": "address"
			},
			{
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"name": "",
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
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
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
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
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

const buyPresale = async () => {
	await connect();
	if (addr == undefined) {
		alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended. Refresh and try again.");
	}
    let bnb = document.getElementById("buyvalue").value;
    bnb = Number(bnb);
    if(bnb >= 0.1 && bnb <= 20) {
        bnb = bnb * 1e18;
        safepony.methods.buyPresale().send({from:addr, value: bnb}, (err, res) => {
            if(!err) {
                console.log(res);
                alert("You have bought our presale! Please wait while you receive your $SAFEPONY.");
            } else {
                alert("An error occured.");
                console.log(err);
            }
        });
    } else {
        alert("Invalid Input!");
    }
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

var release_date = 1624032000 * 1e3;
$(function() {
    $("[release], [countdown]").hide();
    var cd = setInterval(function() {
        if(new Date().getTime() <= release_date) {
            $("[countdown]").show();
            $("#countdown").html(countdown(release_date).toString());
        } else {
            $("[release]").show();
            $("[countdown]").remove();
            clearInterval(cd);
        }
    }, 1000);
    cd();
});