interface Person {
    name: string;
    age?: number; //optional
}

function getPerson(person: Person): void { //void = not return
   console.log(person.name);
}

getPerson({name: "Maciek", age: 27});

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        console.log(`Hi ${this.greeting}`);
    }
}

let greeter = new Greeter("world");
greeter.greet();