(function($) {

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)',
		mobilep: '(max-width: 480px)'
	});

	$(function() {

		var bgArray = [ 'banner.jpg'];
		var bg = bgArray[Math.floor(Math.random() * bgArray.length)];
		var path = 'assets/images/';
		var imageUrl = path + bg;
		$('#banner').css('background-image', 'url(' + imageUrl +')');

		$('.gallery-img').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
		});
		$('.gallery-nav').slick({
			asNavFor: '.gallery-img',
			infinite: true,
			centerMode: true,
			focusOnSelect: true,
			slidesToShow: 3,
			adaptiveHeight: true,
			autoplay: true,
			autoplaySpeed: 3000,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
					}
				},
				{
					breakpoint: 1024,
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
					}
				}
			]
		});

		$('.accommodation-gallery-1').slick({
			centerMode: true,
			slidesToShow: 1,
		});
		$('.accommodation-gallery-2').slick({
			centerMode: true,
			slidesToShow: 1,
		});
		$('.accommodation-gallery-3').slick({
			centerMode: true,
			slidesToShow: 1,
		});
		$('.accommodation-gallery-4').slick({
			centerMode: true,
			slidesToShow: 1,
		});
		$('.accommodation-gallery-5').slick({
			centerMode: true,
			slidesToShow: 1,
		});

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on narrower.
			skel.on('+narrower -narrower', function() {
				$.prioritize(
					'.important\\28 narrower\\29',
					skel.breakpoint('narrower').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				alignment: 'right'
			});

		// Off-Canvas Navigation.

			// Navigation Button.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navButton, #navPanel, #page-wrapper')
						.css('transition', 'none');


	});

})(jQuery);