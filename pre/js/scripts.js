//nawigacja
$(".main-nav").on("click", ".main-nav__toggle", function () {
    $(this).toggleClass("is-open");
    $(".main-nav__colapse").toggleClass("is-open");
});

//chowanie menu
$(window).scroll(function (e) {
    var scroll = $(window).scrollTop();
    if (scroll >= 20) {
        $(".main-nav").addClass("is-move");
    } else {
        $(".main-nav").removeClass("is-move")
    }
});