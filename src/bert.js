var Model = require('./lib/Model');
console.log(Model);
module.exports = function(initialNode) {
    var $initialNode = $(initialNode);

    var entities = [];
    $('[bert-entity]', $initialNode).each(function(index, entityNode) {
        entities.push(new Model(entityNode));
    });

    return entities;
};