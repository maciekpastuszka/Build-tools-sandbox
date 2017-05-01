function getPerson(person) {
    console.log(person.name);
}
getPerson({ name: "Maciek", age: 27 });
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        console.log("Hi " + this.greeting);
    };
    return Greeter;
}());
var greeter = new Greeter("world");
greeter.greet();
