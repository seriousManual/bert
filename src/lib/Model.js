var tools = require('./tools');

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