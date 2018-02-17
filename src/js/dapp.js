const Connect = window.uportconnect.Connect;

const uport = new Connect('EthDenver2018-DecentralizedCamp', {
    clientId: '2oyhgQ4qfVn2FmaXhRB9uDHLETuYco9Kpzu',
    network: 'rinkeby or ropsten or kovan',
    signer: SimpleSigner('2cd562a67a4ffe29ced8efb91f47d91df5693a3d6bf7163373e83ececce6f052')
})

function uportConnect() {
    uport.requestCredentials({
        requested: ['name'],
        notifications: true // We want this if we want to recieve credentials
    })
    .then((credentials) => {
        console.log(credentials);
    });
}

// Attest specific credentials
uport.attestCredentials({
    sub: THE_RECEIVING_UPORT_ADDRESS,
    claim: {
    CREDENTIAL_NAME: CREDENTIAL_VALUE
    },
    exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
})

var web3;
var ENDPOINT = "http://localhost:8545";
localStorage
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
