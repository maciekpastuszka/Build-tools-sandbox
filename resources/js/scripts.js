// console.clear();
//
// function Person(name) {
//     this.name = name;
// }
//
// Person.prototype = {
//     constructor: Person, // person1.constructor === Person
//     sayName: function () {
//         console.log(this.name);
//     }
// };
//
// var person1 = new Person("Maciek");
//
//
// var aya = aya || {};
// aya.framework = function () {
//     // private property
//     var version = '1';
//     // private method
//     var getVersion = function () {
//         return version;
//     };
//
//     // all returned is a public
//     return {
//         // initialization
//         init: function () {
//             console.log('init successful...');
//         },
//         printModuleVersion: function () {
//             console.log('Version: ' + getVersion());
//         }
//     };
// }();
//
// aya.framework.init();
// aya.framework.printModuleVersion();
//
//
// var Module = (function() {
//     function Module(name) {
//         this.name = name;
//         console.log(this.name);
//     }
//
//
//     Module.prototype.foo = function () {
//        console.log("Hello, " + this.name);
//     };
//
//     return Module;
// }());
//
// var module = new Module("Maciek");
// module.foo();

class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    static greet() { //Greeter instance method
        console.log(`Hi ${this.greeting}`);
    }

    hello() { //Greeter prototype method
        console.log(`Hello ${this.greeting}`);
    }
}




let test = new Greeter('world');

// console.log(Greeter);