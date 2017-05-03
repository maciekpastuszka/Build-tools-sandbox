function getPerson(person) {
    console.log(person.name);
}
getPerson({ name: "Maciek", age: 27 });
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = "Default";
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        console.log("Hi " + this.greeting);
    };
    Greeter.hello = function () {
        console.log('Hello');
    };
    return Greeter;
}());
Greeter.msg = "Msg";
var greeter = new Greeter('world');
greeter.greet();
greeter.saying = 'Test';
