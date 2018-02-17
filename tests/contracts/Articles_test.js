// ===================
// Input
// ===================
node_address = process.argv[3].split("=")[1];
if ( typeof node_address === 'undefined' )
{
    console.log("Missing node address");
    return 1;
}

contract_name = process.argv[4].split("=")[1];
if ( typeof contract_name === 'undefined' )
{
    console.log("Missing contract name");
    return 1;
}

contract_file_path = "./" + contract_name + ".sol";

contract_param_1="0x620cbab1f950e38a964d02ddcf85ecfcbb9f468f";
contract_params=[contract_param_1];


// ===================
// Tests
// ===================
function tests() {
    describe('owner', function() {
        it('expected to match', function() {
            assert.equal("0x8833af1a9b1e7ddc837ed2c771078dcf3ac23daf", contract_instance.owner());
        });
    });

    describe('author', function() {
        it('expected to match', function() {
            assert.equal("0x620cbab1f950e38a964d02ddcf85ecfcbb9f468f", contract_instance.author());
        });
    });

    describe('numArticles', function() {
        it('expected to match', function() {
            assert.equal("0", contract_instance.numArticles());
        });
    });
}

// ===================
// Entrypoint
// ===================
var devkit = require('/home/devkit/tools/devkit.js');
devkit.test(contract_params, tests);
