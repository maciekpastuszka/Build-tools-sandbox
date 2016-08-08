(function () {
    //mobile navigation toggle
    var nav_toggle = document.querySelector(".main-nav__toggle"),
        nav = document.querySelector(".main-nav__colapse");

    nav_toggle.addEventListener("click", function () {
        this.classList.toggle("is-open");
        nav.classList.toggle("is-open");
    });

    //menu on scroll
    window.addEventListener("scroll", function () {
        var main_nav = document.querySelector(".main-nav"),
            scroll = document.body.scrollTop;

        if (scroll >= 20) {
            main_nav.classList.add("is-move");
        } else {
            main_nav.classList.remove("is-move");
        }
    });
}());

/*==================================================
FUNCTIONS
*=================================================*/

//-----------IIFE

(function (global) {

})(this)


/*==================================================
MAIN
*=================================================*/


/*==================================================
OBJECTS
*=================================================*/

//-----------Konstruktor

function Person(name) {
    this.name = name;
    this.sayName = function () {
        console.log(this.name);
    }

}

var person1 = new Person("Maciek");

//-----------Prototyp

function Person(name) {
    this.name = name;
};

Person.prototype = {
    constructor: Person, // person1.constructor === Person // inaczej byłby Object 
    sayName: function () {
        console.log(this.name);
    }
};

var person1 = new Person("Maciek");

//Person jest konstruktorem prototypu a nie person1. Instancja jest połączona z konstruktorem za pośrednictwem prototypu

//-----------Dziedziczenie

var person1 = {
    name: "Maciek",
    sayName: function () {
        console.log(this.name);
    }

};

var person2 = Object.create(person1);

person2.sayName(); // Jan
person1.isPrototypeOf(person2); //true

/*=========================
OBJECTS / PATTERNS
*========================*/

//-----------Module pattern

var aya = aya || {};
aya.framework = function () {
    // private property
    var version = '0.0.2';
    // private method
    var getVersion = function () {
        return version;
    }

    // all returned is a public
    return {
        // initialization
        init: function () {
            console.log('init successful...');
        },
        printModuleVersion: function () {
            console.log('Version: ' + getVersion());
        }
    }
}();

aya.framework.init();
aya.framework.printModuleVersion();

/*==================================================
Other
*=================================================*/

//-----------Event listener
myEl.addEventListener('click', function () {
    alert('Hello world');
}, false);