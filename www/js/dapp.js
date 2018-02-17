var web3;
var ENDPOINT = "http://localhost:8545";
var contract;

$(document).ready(function() {
    var web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT));

    var abi = contracts['EthDenver'].abi;
    var contract_address = contracts['EthDenver'].address;
    var contract_interface = web3.eth.contract(abi);
    contract = contract_interface.at(contract_address);
 
    //add code
});

function addContact() {
    result = contract.addContact();
}
