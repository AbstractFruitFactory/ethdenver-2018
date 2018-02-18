/* global Web3 globalState render */

// Setup
var credentials;
const Connect = window.uportconnect.Connect;
const SimpleSigner = window.uportconnect.SimpleSigner;
const uport = new Connect('EthDenver2018-DecentralizedCamp', {
  clientId: '2oyhgQ4qfVn2FmaXhRB9uDHLETuYco9Kpzu',
  network: 'rinkeby',
  signer: SimpleSigner('2cd562a67a4ffe29ced8efb91f47d91df5693a3d6bf7163373e83ececce6f052')
})

// uPort connect
const uportConnect = function () {
  uport.requestCredentials({
    requested: ['name'],
    notifications: true // We want this if we want to recieve credentials
  })
    .then((result) => {
      console.log(result);
      $("#connectUportBtn").hide();
      credentials = result;
      checkUserAccount(credentials.address);
    })
}

const uportSign = function (id) {
  const cred = {
    sub: credentials.address,
    claim: {'name': credentials.name },
    exp: '1300819380',
    uriHandler: (log) => { console.log(log) }
  }
  uport.attestCredentials(cred).then(res => {
    console.log("it works")
  })
}
