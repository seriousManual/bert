var Traverser = require('./lib/Traverser');

module.exports = function(initialNode) {
    var t = new Traverser();

    return t.getEntities();
};