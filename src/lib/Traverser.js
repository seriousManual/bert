var Model = require('./Model');
var List = require('./List');
var tokens = require('./TOKENS');

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
    var children = node.children;
    var propertyName = node.getAttribute(tokens.LIST_PROPERTY);
    var listOfChildEntities = this._handleListOfEntities(children);
    var myList = new List(node, children[0], this);

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