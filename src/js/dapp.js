var web3;
var contractInstance;
var selectedAccount;
var currentBlockNumber; //for eventhandler to know current block number

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
    abiDecoder.addABI(abi);

    var address = contracts['EthDenver'].address;
    contractInstance = contract.at(address);

    eth.accounts().then(function(accounts) {
        if (accounts[0] !== undefined) {
            selectedAccount = accounts[0];
        }
    });
    
    var filter = new contractInstance.filters.Filter({delay: 1000});
    filter.new({toBlock: 'latest'});
    filter.watch(function(err, result) {
        if (result !== undefined && result && result.length > 0) {
            // get all results higher than currentBlockNumber. Sometimes some results have lower block number than actual block number.
            result = $.grep(result, function(v, i) {
                if (currentBlockNumber < v.blockNumber.toString()) {
                    return true;
                }
                return false;
            });

            var decodedLogs = abiDecoder.decodeLogs(result);
            
            // set current block number to let future events listen to latest block number
            var blockNumbers = $.map(result, function(v, i) {
                return parseInt(v.blockNumber.toString());
            });

            currentBlockNumber = Math.max.apply(null, blockNumbers);

            $.each(decodedLogs, function(i, v) {
                if (v.name === 'CreateAccount') {
                   $("#showAccount").show();
                   $("#createAccount").hide();
                }
            });
        }
    });
}


function checkUserAccount(uPortId){

    uPortId = stringToHex(uPortId, 73);

    contractInstance.getAccount(uPortId).then(function(result, error){

        if(error){
            alert(error);
        }
        var user = Eth.toAscii(result[0]).replace(/\u0000/g, '');

        if(user === ""){
            $("#createAccount").show();
            $('#btnCreateAccount').on("click", function(){
                name = stringToHex($(".userName").val(),67);    
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
    //Show spinner
    contractInstance.createAccount(uPortId, name, {from: selectedAccount}).then(function(result, error){
        if(error){
            alert(error);
        }
    });

}

function stringToHex(hexString, n) {
    hexString = Eth.fromAscii(hexString);
    var zeroes = Array(n).join('0');
    return hexString + zeroes.substring(0, zeroes.length - hexString.length);
}
