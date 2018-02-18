pragma solidity ^0.4.17;

contract EthDenver {

    mapping(string => Contact) accounts;

    event CreateAccount(string id);

    struct Contact {
        string name;
        mapping(string => Contact) contacts;
        string[] contactsArray;

        //The user accounts data 
        mapping(bytes32 => MetaData) metaDatas;
        bytes32[] metaDatasArray;

        //Data shared to this account
        mapping(bytes32 => MetaData) shares;
        bytes32[] sharesArray;
    }

    struct MetaData { 
        string key;
        string value;
    }
    
    //Examples of MetaData (Each Dap can save metadata)
    // key = profile
    // value = PhoneNumner = true, email = false, 
    // key = CryptoKitten
    // value = ethereumaddress to show


    // One idea would be to just have a Hash with booleans that tells if you have access
    // put data in another container

    function createAccount(string _ownerId, string _name) public {
        accounts[_ownerId].name = _name;
        //CreateAccount(_ownerId);
    }

    function getAccount(string _ownerId) public view returns (string) {
        return accounts[_ownerId].name;
    }

    //Add a contact to the account
    //_ownerId = uportId of account-owner: TODO: make a secure solution of this
    //_contactId = uportId of the new contact
    //_name = name of new contact
    
    function addContact(string _ownerId, string _contactId) public {
        accounts[_ownerId].contactsArray.push(_contactId);
    }

    function addMetaData(string _ownerId, string _key, string _value) public {
        bytes32 id = keccak256(msg.sender, msg.data, now);

        accounts[_ownerId].metaDatas[id] = MetaData(_key, _value);
        accounts[_ownerId].metaDatasArray.push(id);
    }

    function getMetaDatas(string _ownerId) public view returns (bytes32[]) {
        return accounts[_ownerId].metaDatasArray;
    }

    function getMetaData(string _ownerId, bytes32 id) public view returns (string, string) {
        MetaData memory meta = accounts[_ownerId].metaDatas[id];

        return (meta.key, meta.value);
    }
}
