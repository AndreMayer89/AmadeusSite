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
		grabcursorenabled: false,
		autohidemode: true
    });
	$('.nicescroll-rails').click(function(e) {
		var mouseY = e.pageY - $('html').scrollTop();
		var scrollY = this.childNodes[0].offsetTop;
		if (mouseY > scrollY && mouseY < (scrollY + 112)) {
			return;
		}
		$('html,body').animate({
                    scrollTop: mouseY < scrollY ? $('html').scrollTop() - window.outerHeight + 30 : $('html').scrollTop() + window.outerHeight - 30
                }, 1000);
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

    /*$('header').css({ 'min-height': (($(window).height())) + 'px' });
    $(window).resize(function () {
        $('header').css({ 'min-height': (($(window).height())) + 'px' });
    });*/

    $(document).on('click', '#section-news .news-card', function () {
        window.open($(this).attr('data-news-url'));
    });

    $('.animation-text-slide-show').slideDown(1000);
});