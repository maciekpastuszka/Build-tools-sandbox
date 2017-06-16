class Test {
    constructor(message) {
        this.greeting = message;
    }

    init() {
        console.log(`Hello ${this.greeting}`);
    }
}

export default Test;