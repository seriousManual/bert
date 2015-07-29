console.time('setup');
var bertApp = bert();
console.timeEnd('setup');

var e1 = bertApp[0];

console.time('propertyGet');
console.log(e1.getFirstName());
console.timeEnd('propertyGet');

console.time('propertyGet');
console.log(e1.getFamilyName());
console.timeEnd('propertyGet');

console.log(e1.hobbies.get(0).getTitle());
console.log(e1.hobbies.get(0).getSkill());

console.time('applyData');
e1.hobbies.get(2).applyData({
    title: 'fooTitle',
    skill: 'fooSkill'
});
console.timeEnd('applyData');

console.time('newEntry');
e1.hobbies.add({
    title: 'newnewTitle',
    skill: 'newnewSkill'
});
console.timeEnd('newEntry');

setTimeout(function() {
    console.time('propertySet');
    e1.setFirstName('foo111');
    console.timeEnd('propertySet');

    e1.setFamilyName('bar');
}, 1000);

setTimeout(function() {
    console.time('deletion');
    e1.hobbies.del(0);
    console.timeEnd('deletion');
}, 2000);

setTimeout(function() {
    e1.hobbies.get(1).setTitle('newTitle');
    e1.hobbies.get(1).setSkill('newSkill');
}, 3000);

setTimeout(function() {
    e1.hobbies.add({
        title: 'newTitle',
        skill: 'newSkill'
    });
}, 4000);