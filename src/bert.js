var Model = require('./lib/Model');

module.exports = function(initialNode) {
    var $initialNode = $(initialNode);

    $('[bert-entity]', $initialNode).each(function(index, entity) {
        var a = new Model(entity);
    });
};