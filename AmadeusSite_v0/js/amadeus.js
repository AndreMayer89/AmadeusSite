// JavaScript source code
(function ($) {
    $(document).ready(function () {
        if ($(window).width() < 480 || $(window).height() < 480) {
            var lastScrollTop = 0;
            $(window).scroll(function (event) {
                var st = $(this).scrollTop();
                if (st > lastScrollTop) {
                    $("#section-menu").hide();
                } else {
                    $("#section-menu").show();
                }
                lastScrollTop = st;
            });
        }
    });
}(jQuery));