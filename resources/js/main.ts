interface Person {
    name: string;
    age?: number;
}



function getPerson(person: Person) {
   console.log(person.name);
}

getPerson({name: "Maciek", age: 27});