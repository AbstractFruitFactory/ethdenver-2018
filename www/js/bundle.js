(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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

},{}]},{},[1]);
