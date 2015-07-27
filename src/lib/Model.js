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