!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.bert=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Traverser = _dereq_('./lib/Traverser');

module.exports = function(initialNode) {
    var t = new Traverser();

    return t.getEntities();
};
},{"./lib/Traverser":5}],2:[function(_dereq_,module,exports){
var Model = _dereq_('./Model');

function List(parentNode, stencil) {
    this._parentNode = parentNode;
    this._stencil = stencil;

    this._children = [];
}

List.prototype.addChild = function(child) {
    this._children.push(child);
};

List.prototype.all = function() {
    return this._children;
};

List.prototype.get = function(index) {
    return this._children[index];
};

List.prototype.del = function(index) {
    var deleteElement = this._children[index];
    this._children.splice(index, 1);

    this._parentNode.removeChild(deleteElement.getNode());

    return deleteElement;
};

List.prototype.add = function(data) {
    //var clone = this._stencil.cloneNode(true);
    //var newElement = new Model(clone);
    //newElement.applyData(data);
    //
    //this._children.push(newElement);
    //this._parentNode.appendChild(newElement.getNode());
    //
    //return newElement;
};

module.exports = List;
},{"./Model":3}],3:[function(_dereq_,module,exports){
var tools = _dereq_('./tools');

function Model(node) {
    this._node = node;

    this._data = {};
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

Model.prototype.addProperty = function(name, value, node) {
    var that = this;

    name = tools.ucfirst(name);

    this._data[name] = value;
    this['get' + name] = function() {
        return that._data[name];
    };

    this['set' + name] = function(value) {
        that._data[name] = value;
        node.textContent = value;
    };
};

Model.prototype.addList = function(name, list) {
    this[name] = list;
};

module.exports = Model;
},{"./tools":6}],4:[function(_dereq_,module,exports){
module.exports = {
    ENTITY: 'bert-entity',
    PROPERTY: 'bert-property',
    LIST: 'bert-list',
    LIST_PROPERTY: 'bert-list-property'
};
},{}],5:[function(_dereq_,module,exports){
var Model = _dereq_('./Model');
var List = _dereq_('./List');
var tokens = _dereq_('./TOKENS');

function Traverser() {
    this._entities = this._findEntities();
}

Traverser.prototype._traverseNode = function (node, context) {
    var children = node.children;

    for (var i = 0; i < children.length; i++) {
        var child = children[i];

        if (child.hasAttribute(tokens.PROPERTY)) {
            this._handleProperty(child, context);
        } else if (child.hasAttribute(tokens.LIST)) {
            this._handleList(child, context);
        } else {
            this._traverseNode(child);
        }
    }
};

Traverser.prototype._handleProperty = function (node, context) {
    var propertyName = node.getAttribute(tokens.PROPERTY);
    var propertyValue = node.textContent;

    context.addProperty(propertyName, propertyValue, node);
};

Traverser.prototype._handleList = function (node, context) {
    var propertyName = node.getAttribute(tokens.LIST_PROPERTY);
    var listOfChildEntities = this._handleListOfEntities(node.children);
    var myList = new List(node, listOfChildEntities[0]);

    listOfChildEntities.forEach(function(child) {
        myList.addChild(child);
    });

    context.addList(propertyName, myList);
};

Traverser.prototype._findEntities = function () {
    return this._handleListOfEntities(document.querySelectorAll('[' + tokens.ENTITY + ']'));
};

Traverser.prototype._handleListOfEntities = function(entities) {
    var result = [];

    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        var currentContext = new Model(entity);

        this._traverseNode(entity, currentContext);

        result.push(currentContext);
    }

    return result;
};

Traverser.prototype.getEntities = function() {
    return this._entities;
};

module.exports = Traverser;
},{"./List":2,"./Model":3,"./TOKENS":4}],6:[function(_dereq_,module,exports){
module.exports = {
    ucfirst: function(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }
};
},{}]},{},[1])
(1)
});