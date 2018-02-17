import { Connect, SimpleSigner } from 'uport-connect';

const uport = new Connect('EthDenver2018-DecentralizedCamp', {
    clientId: '2oyhgQ4qfVn2FmaXhRB9uDHLETuYco9Kpzu',
    network: 'ropsten',
    signer: SimpleSigner('2cd562a67a4ffe29ced8efb91f47d91df5693a3d6bf7163373e83ececce6f052')
})

export default function requestCredentials() {
    uport.requestCredentials({
        requested: ['name'],
        notifications: true // We want this if we want to recieve credentials
    })
    .then((credentials) => {
        console.log(credentials);
    })
}


// Attest specific credentials
uport.attestCredentials({
    sub: THE_RECEIVING_UPORT_ADDRESS,
    claim: {
    CREDENTIAL_NAME: CREDENTIAL_VALUE
    },
    exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
})