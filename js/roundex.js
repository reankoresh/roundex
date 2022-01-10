/*
  [JS Index]
  
  ---
  
  Template Name: Roundex - Circular Photography and Video Portfolio
  Author:  ex-nihilo
  Version: 1.0
*/


/* 
  1. preloader
  2. swiper slider
  3. transitions
  4. owl carousel slider
  5. magnificPopup
  6. to top animation
  7. navigation
    7.1. navigation launcher
    7.2. navigation OPEN/CLOSE
  8. chart skills
  9. clone function
  10. contact form
*/


$(function() {
    "use strict";
	
	
    // 1. preloader
    $("#preloader").fadeOut(800);
    $(".preloader-bg").delay(600).fadeOut(800);
	
    // 2. swiper slider
    var swiper = new Swiper(".swiper-container-wrapper .swiper-container", {
        preloadImages: false,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        init: true,
        loop: false,
        speed: 1200,
        grabCursor: true,
        mousewheel: true,
        keyboard: true,
        simulateTouch: true,
        parallax: true,
        effect: "slide",
        pagination: false,
        navigation: {
            nextEl: ".slide-next",
            prevEl: ".slide-prev"
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true
        }
    });
    swiper.on("slideChangeTransitionStart", function() {
        $(".slider-progress-bar").removeClass("slider-active");
        $(".hero-bg").find("video").each(function() {
            this.pause();
        });
    });
    swiper.on("slideChangeTransitionEnd", function() {
        $(".slider-progress-bar").addClass("slider-active");
        $(".hero-bg").find("video").each(function() {
            this.play();
        });
    });
    var playButton = $(".swiper-slide-controls-play-pause-wrapper");
    function autoEnd() {
        playButton.removeClass("slider-on-off");
        swiper.autoplay.stop();
    }
    function autoStart() {
        playButton.addClass("slider-on-off");
        swiper.autoplay.start();
    }
    playButton.on("click", function() {
        if (playButton.hasClass("slider-on-off")) autoEnd();
        else autoStart();
        return false;
    });
	
    $(window).on("scroll", function() {
        // 3. transitions
        if ($(this).scrollTop() > 100) {
            $(".to-top-arrow").addClass("show");
        } else {
            $(".to-top-arrow").removeClass("show");
        }
        if ($(this).scrollTop() > 500) {
            $(".round-menu").addClass("direction");
			$(".round-menu").addClass("round-menu-no-bg");
        } else {
            $(".round-menu").removeClass("direction");
			$(".round-menu").removeClass("round-menu-no-bg");
        }
    });
	
    // 4. owl carousel slider
    $("#owl-carousel-team").owlCarousel({
        loop: false,
        center: false,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: false,
        nav: true,
        navText: ["<i class='ion-chevron-left'></i>", "<i class='ion-chevron-right'></i>"],
        navContainer: '.owl-nav-custom-team',
        responsive: {
            0: {
                items: 1,
                margin: 30
            },
            768: {
                items: 2,
                margin: 40
            },
            980: {
                items: 2,
                margin: 40
            },
            1240: {
                items: 3,
                margin: 50
            }
        }
    });
	
    // 5. magnificPopup
    $(".popup-photo-gallery").each(function() {
        $(this).magnificPopup({
            delegate: "a",
            type: "image",
            gallery: {
                enabled: true
            },
            removalDelay: 100,
            mainClass: "mfp-fade",
            fixedContentPos: false
        });
    });
	
    // 6. to top animation
    $(".to-top-arrow").on("click", function() {
        $(".introduction").removeClass("introduction-off").addClass("introduction-on");
        $("nav.navigation-menu").removeClass("show");
        $("body, html").animate({
            scrollTop: 0
        }, 1000);
        return false
    })
	
    // 7. navigation
    // 7.1. navigation launcher
    $(".navigation-fire").on("click", function() {
        if ($(".introduction").hasClass("introduction-off")) {
            $(".introduction").removeClass("introduction-off").addClass("introduction-on");
            $("nav.navigation-menu").removeClass("show");
        } else {
            $(".introduction").removeClass("introduction-on").addClass("introduction-off");
            $("nav.navigation-menu").addClass("show");
        }
    });
    // 7.2. navigation OPEN/CLOSE
    $("nav.navigation-menu a").on("click", function() {
        if ($("nav.navigation-menu").hasClass("show")) {
            $("nav.navigation-menu").removeClass("show");
            $(".introduction").removeClass("introduction-off").addClass("introduction-on");
        } else {
            $("nav.navigation-menu").addClass("show");
        }
    });
	
    // 8. chart skills
    $(".chart-appear-skills").appear(function() {
        $(".chart-skills").easyPieChart({
            easing: "easeOutBounce",
            onStep: function(from, to, percent) {
                $(this.el).find(".percent-skills").text(Math.round(percent));
            }
        });
    });
	
	// 9. clone function
    $.fn.duplicate = function(count, cloneEvents, callback) {
        var stack = [],
            el;
        while (count--) {
            el = this.clone(cloneEvents);
            callback && callback.call(el);
            stack.push(el.get()[0]);
        }
        return this.pushStack(stack);
    };
    $("<div class='vertical-lines-wrapper'></div>").appendTo(".vertical-lines");
    $("<div class='vertical-effect'></div>").duplicate(3).appendTo(".vertical-lines-wrapper");
    $("<div class='vertical-lines-wrapper'></div>").appendTo(".vertical-lines");
    $("<div class='vertical-effect-2'></div>").duplicate(3).appendTo(".vertical-lines-wrapper");
	
    // 10. contact form
    $("form#form").on("submit", function() {
        $("form#form .error").remove();
        var s = !1;
        if ($(".requiredField").each(function() {
                if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error">This field is required</span>'), $(this).addClass(
                    "inputError"), s = !0;
                else if ($(this).hasClass("email")) {
                    var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error">Invalid email address</span>'), $(this).addClass(
                        "inputError"), s = !0);
                }
            }), !s) {
            $("form#form input.submit").fadeOut("normal", function() {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function() {
                $("form#form").slideUp("fast", function() {
                    $(this).before('<div class="success">Your email was sent successfully.</div>');
                });
            });
        }
        return !1;
    });
	
	
});