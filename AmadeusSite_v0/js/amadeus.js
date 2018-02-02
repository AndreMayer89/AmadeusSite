new WOW().init();
$(function () {
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

    $('html').niceScroll({
        mousescrollstep: 70,
        cursorcolor: "#ff6c72",
        cursorwidth: "8px",
        cursorborderradius: "10px",
        cursorborder: "none",
    });

    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    $('#section-main').css({ 'height': (($(window).height())) + 'px' });
    $(window).resize(function () {
        $('#section-main').css({ 'height': (($(window).height())) + 'px' });
    });

    $(document).on('click', '#section-news .news-card', function () {
        window.open($(this).attr('data-news-url'));
    });

    $('.animation-text-slide-show').slideDown(1000);
});