
/*==================================================
 DOM patterns
 *=================================================*/

var menu = (function () {
    var menu_toggle = $('.js-menu_toggle'),
        main_nav = $('.js-main-nav');
    var init = function () {
        menu_toggle.on('mouseover', function () {
            main_nav.addClass('main-nav--is-collapse');
            menu_toggle.html(" ");
        });
    };
    return {
        init: init
    };
})();

//module

var s,
    NewsWidget = {
        settings: {
            numArticles: 5,
            articleList: $("#article-list"),
            moreButton: $("#more-button")
        },

        init: function () {
            s = this.settings;
            this.bindUIActions();
        },

        bindUIActions: function () {
            s.moreButton.on("click", function () {
                NewsWidget.getMoreArticles(s.numArticles);
            });
        },

        getMoreArticles: function (numToGet) {
            // $.ajax or something
            // using numToGet as param
        }

    };

(function() {
    NewsWidget.init();
})();

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