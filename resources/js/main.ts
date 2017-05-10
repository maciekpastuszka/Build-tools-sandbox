interface Person {
    name: string;
    age?: number; //optional
}

function getPerson(person: Person): void { //void = not return
   console.log(person.name);
}

getPerson({name: "Maciek", age: 27});


class Greeter {
    greeting: string = "Default";
    saying: string;
    static msg: string = "Msg";
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        console.log(`Hi ${this.greeting}`);
    }
    static hello() {
        console.log('Hello');
    }
}

let greeter = new Greeter('world');
greeter.greet();

greeter.saying = 'Test';


class AwesomePerson extends Greeter {
    greet() {
        console.log(`Hi awesome ${this.greeting}`)
        super.greet();
    }
}

let awesome = new AwesomePerson('awesome world');
awesome.greet();
