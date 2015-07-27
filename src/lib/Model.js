var tools = require('./tools');
var List = require('./List');

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