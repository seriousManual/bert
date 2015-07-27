!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.bert=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Model = _dereq_('./lib/Model');
console.log(Model);
module.exports = function(initialNode) {
    var $initialNode = $(initialNode);

    var entities = [];
    $('[bert-entity]', $initialNode).each(function(index, entityNode) {
        entities.push(new Model(entityNode));
    });

    return entities;
};
},{"./lib/Model":3}],2:[function(_dereq_,module,exports){
var tools = _dereq_('./tools');

function List(children, $parentNode, stencil) {
    this._children = children;
    this._$parentNode = $parentNode;
    this._$stencil = stencil;
}

List.prototype.all = function() {
    return this._children;
};

List.prototype.get = function(index) {
    return this._children[index];
};

List.prototype.del = function(index) {
    var deleteElement = this._children[index];
    this._children.splice(index, 1);

    deleteElement.getNode().remove();

    return deleteElement;
};

List.prototype.add = function(data) {
    var Model = _dereq_('./Model');

    var $clone = this._$stencil.clone();
    var newElement = new Model($clone);
    newElement.applyData(data);

    this._children.push(newElement);
    this._$parentNode.append(newElement.getNode());

    return newElement;
};

module.exports = List;
},{"./Model":3,"./tools":4}],3:[function(_dereq_,module,exports){
var tools = _dereq_('./tools');
var List = _dereq_('./List');

function Model(node) {
    this._node = node;

    this._data = {};

    this._parse();
    this._parseLists();
}

Model.prototype.getNode = function() {
    return this._node;
};

Model.prototype.applyData = function(data) {
    var that = this;

    this._data = data;
    Object.keys(data).forEach(function(key) {
        that['set' + tools.ucfirst(key)].call(this, data[key]);
    });
};

Model.prototype._addProperty = function(name, value, $node) {
    var that = this;

    name = tools.ucfirst(name);

    this._data[name] = value;
    this['get' + name] = function() {
        return that._data[name];
    };

    this['set' + name] = function(value) {
        that._data[name] = value;
        $node.text(value);
    };
};

Model.prototype._addList = function(name, list) {
    this[name] = list;
};

Model.prototype._parse = function() {
    var that = this;

    $('[bert-property]', this._node).not('[bert-list] [bert-property]', this._node).each(function(i, node) {
        var $node = $(node);
        that._addProperty($node.attr('bert-property'), $node.text(), $node);
    });
};

Model.prototype._parseLists = function() {
    var that = this;

    $('[bert-list]', this._node).each(function(i, node) {
        var $node = $(node);
        var name = $node.attr('bert-list-property');

        var childNodes = $node.children();
        var childModels = [];
        childNodes.each(function(i, childNode) {
            childModels.push(new Model(childNode));
        });

        that._addList(name, new List(childModels, $node, $(childNodes[0])));
    });
};

module.exports = Model;
},{"./List":2,"./tools":4}],4:[function(_dereq_,module,exports){
module.exports = {
    ucfirst: function(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }
};
},{}]},{},[1])
(1)
});