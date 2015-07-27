var tools = require('./tools');

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
    var Model = require('./Model');

    var $clone = this._$stencil.clone();
    var newElement = new Model($clone);
    newElement.applyData(data);

    this._children.push(newElement);
    this._$parentNode.append(newElement.getNode());

    return newElement;
};

module.exports = List;