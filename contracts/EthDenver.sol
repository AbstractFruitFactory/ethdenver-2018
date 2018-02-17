pragma solidity ^0.4.17;

contract EthDenver {

    mapping(string => Contact) accounts;

    struct Contact {
        bytes32 name;
        mapping(string => Contact) contacts;
        string[] contactsArray;

        //The user accounts data 
        mapping(bytes32 => MetaData) metaDatas;
        MetaData[] metaDatasArray;

        //Data shared to this account
        mapping(bytes32 => MetaData) shares;
        MetaData[] sharesArray;
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

    function createAccount(string _ownerId, bytes32 _name) public {
        accounts[_ownerId].name = _name;
    }

    function getAccount(string _ownerId) public view returns (bytes32) {
        return accounts[_ownerId].name;
    }

    //Add a contact to the account
    //_ownerId = uportId of account-owner: TODO: make a secure solution of this
    //_contactId = uportId of the new contact
    //_name = name of new contact
    function addContact(string _ownerId, string _contactId) public {
        accounts[_ownerId].contacts[_contactId];
        accounts[_ownerId].contactsArray.push(_contactId);
    }







}
