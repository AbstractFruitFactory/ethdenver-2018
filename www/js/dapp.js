var web3;
var ENDPOINT = "http://localhost:8545";

$(document).ready(function() {
    var l = getNumArticles();
    console.log("Number of articles: " + l);
    if(l==0) {
        $('#articles').append(
            "<div class='aha'><h3>No articles here yet.. Try reloading in a while.</h3>"
        );
    }
    for(var i=0;i<l;i++) {
        var article = getArticle(i);
        $('#articles').append(
            "<div class='aha'><h3>"+article.title+"</h3>" +
            "<a target='_blank' href='"+article.hash+"'>"+article.hash+"</a></div>"
        );
    }
});

function getNumArticles() {
    web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT));

    var abi = contracts['Articles'].abi;
    var contract_address = contracts['Articles'].address;

    var contract_interface = web3.eth.contract(abi);

    var contract = contract_interface.at(contract_address);
    var result;
    result = contract.numArticles();
    return result.c[0];
}

function getArticle(index) {
    web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT));

    var abi = contracts['Articles'].abi;
    var contract_address = contracts['Articles'].address;

    var contract_interface = web3.eth.contract(abi);
    var contract = contract_interface.at(contract_address);
    var result="";
    result = contract.getArticle(index);
    return {
        title: result[0],
        hash: result[1]
    };
}
