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