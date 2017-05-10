var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var AwesomePerson = (function (_super) {
    __extends(AwesomePerson, _super);
    function AwesomePerson() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AwesomePerson.prototype.greet = function () {
        console.log("Hi awesome " + this.greeting);
    };
    return AwesomePerson;
}(Greeter));
var awesome = new AwesomePerson('awesome world');
awesome.greet();
