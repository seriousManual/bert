var bertApp = bert('body');

var e1 = bertApp[0];

console.log(e1.getFirstName());
console.log(e1.getFamilyName());

setTimeout(function() {
    e1.setFirstName('foo');
    e1.setFamilyName('bar');
}, 1000);

setTimeout(function() {
    e1.hobbies.del(0);
}, 2000);

setTimeout(function() {
    e1.hobbies.add({
        title: 'foo',
        skill: 'bar'
    });
}, 3000);

//console.log(e1.hobbies.get(0).getTitle());
//console.log(bertApp.hobbies.get(0).getSkill());
//console.log(bertApp.hobbies.get(1).setTitle('newTitle'));
//console.log(bertApp.hobbies.get(1).setSkill('newSkill'));

//e1.hobbies.del(0);
