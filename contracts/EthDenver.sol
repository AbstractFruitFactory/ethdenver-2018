pragma solidity ^0.4.17;

contract EthDenver {

    mapping(bytes32 => Contact) accounts;

    struct Contact {
        string name;
        mapping(bytes32 => Contact) contacts;
        bytes32[] contactsArray;

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


    //Add a contact to the account
    //_ownerId = uportId of account-owner: TODO: make a secure solution of this
    //_contactId = uportId of the new contact
    //_name = name of new contact
    function addContact(bytes32 _ownerId, bytes32 _contactId, string _name) public {
        Contact storage contact = accounts[_ownerId].contacts[_contactId];
        contact.name = _name;
        accounts[_ownerId].contactsArray.push(_contactId);
    }







}
