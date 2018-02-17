var web3;
var contractInstance;
var selectedAccount;
var ENDPOINT = "http://localhost:8545";


function lackingWeb3() {
    alert("metamask needed!")
}

$(document).ready(function() {
    if (typeof window.web3 !== 'undefined') {
        initWeb3();
    } else {
        lackingWeb3();
    }
});

function initWeb3() {
    this.web3 = window.web3;
    var eth = new Eth(web3.currentProvider);

    var abi = contracts['EthDenver'].abi;
    var contract = eth.contract(abi);

    var address = contracts['EthDenver'].address;
    contractInstance = contract.at(address);

    eth.accounts().then(function(accounts) {
        if (accounts[0] !== undefined) {
            selectedAccount = accounts[0];
        }
    });
}

function checkUserAccount(uPortId){
    contractInstance.getAccount(uPortId).then(function(result, error){
        var user = Eth.toAscii(result[0]).replace(/\u0000/g, '');

        if(user === ""){
            $("#createAccount").show();
            $('#btnCreateAccount').on("click", function(){
                var name = stringToHex($(".userName").val(), 67);
                
                createAccount(uPortId, name);
            })
        }
        else{
            $(".userName").html(user);
            $("#showAccount").show();
        }
    })
}
function createAccount(uPortId, name) {
    contractInstance.createAccount(uPortId, name, {from: selectedAccount}).then(function(){
        console.log('user created!');
    });
}

function stringToHex(hexString, n) {
    hexString = Eth.fromAscii(hexString);
    var zeroes = Array(n).join('0');
    return hexString + zeroes.substring(0, zeroes.length - hexString.length);
}

function addFriend() {
    
}
