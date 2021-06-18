let web3 = new web3js.myweb3(window.ethereum);
let addr;

const sttaddr = "0x6e0cFFffd0e41675f157e169748A1A894A0B812f";
const sttabi = [{"constant":true,"inputs":[],"name":"safepony","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"aSBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"}],"name":"setTokenAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"devAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_aSBlock","type":"uint256"},{"name":"_aEBlock","type":"uint256"},{"name":"_aMin","type":"uint256"},{"name":"_aMax","type":"uint256"}],"name":"enablePresale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buyPresale","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"aEBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"aMax","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"aMin","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"token","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"DeveloperTransferred","type":"event"}];

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

var release_date = 1624024800 * 1e3;
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