var Model = require('./Model');

function List(parentNode, stencil, traverser) {
    this._parentNode = parentNode;
    this._stencil = stencil;
    this._traverser = traverser;

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
    var clone = this._stencil.cloneNode(true);
    var newElement = new Model(clone);

    this._traverser._traverseNode(clone, newElement);
    newElement.applyData(data);

    this._children.push(newElement);
    this._parentNode.appendChild(newElement.getNode());

    return newElement;
};

module.exports = List;