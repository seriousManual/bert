!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.bert=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Model = _dereq_('./lib/Model');

module.exports = function(initialNode) {
    var $initialNode = $(initialNode);

    $('[bert-entity]', $initialNode).each(function(index, entity) {
        var a = new Model(entity);
    });
};
},{"./lib/Model":2}],2:[function(_dereq_,module,exports){
function Model(node) {
    this._node = node;

    this._parse();
}

Model.prototype._parse = function() {
    $('[bert-property]', this._node).each(function(index, value) {
        console.log(value);
    });
console.log('-------');
    $('[bert-property]', this._node).not('[bert-list]').each(function(index, value) {
        console.log(value);
    });
};

module.exports = Model;
},{}]},{},[1])
(1)
});