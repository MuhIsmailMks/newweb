jQuery(document).ready(function ($) {

	var scrollWidth = window.innerWidth - document.documentElement.clientWidth;

	$('img, a').on('dragstart', function (event) {
		event.preventDefault();
	});

	$('.js-menu a, [data-scroll]').mPageScroll2id({
		scrollSpeed: 650,
	});

	$('.header__sandwich').click(function () {
		$(this).toggleClass('active');
		$('.header__menu').fadeToggle(200)
	});

	var lazy = $('.lazy').lazy({
		chainable: false,
		scrollDirection: 'vertical'
	});
	$(window).on('load', function () {
		lazy.update();
	});

	// Animation

	function marqueeLinesChange(el) {
		var point = $(window).scrollTop() + $(window).height() - el.offset().top;
		var percent = point * 100 / ($(window).height() + el.outerHeight());
		var translateX = percent / 5;

		if (translateX < 0) translateX = 0;

		el.find('.marquee-lines__wrap._left').css('transform', 'translate3d(-' + translateX + '%,0,0)');
		el.find('.marquee-lines__wrap._right').css('transform', 'translate3d(' + translateX + '%,0,0)');
	}

	$('.marquee-lines').each(function () {
		var el = $(this);
		$(window).on('load resize scroll', function () {
			marqueeLinesChange(el);
		});
	});

	function animateBox(item, animate) {
		item.addClass("animate__animated");
		$(window).on('scroll load resize', function () {
			if ($(window).scrollTop() > item.offset().top - $(window).height() + 80) item.addClass(`${animate} _show`);
		});
	};

	function animateBoxes(wrap, items) {
		$(wrap).each(function () {
			var wrap = $(this);
			var wrapItems = wrap.find(items);
			wrapItems.each(function (i) {
				$(this).addClass("animate__animated").css({
					'animation-delay': (i * 0.15) + 's',
					'opacity': 0
				});
			});
			$(window).on('scroll load resize', function () {
				if ($(window).scrollTop() > wrap.offset().top - $(window).height() + 80) wrapItems.addClass(`animate__fadeInUp`).css("opacity", 1);
			});
		});
	};

	$('[data-animate]').each(function () {
		let effect = $(this).attr('data-animate') || 'animate__fadeInUp';
		animateBox($(this), effect);
	});

	animateBoxes('.tokenomics__items', '.tokenomics__item');
	animateBoxes('.advants__grid', '.advants__col');
	animateBoxes('.partners__grid', '.partners__item');
	animateBoxes('.team__grid', '.team-item');

	// Animation END

	$('.copy-box').each(function () {
		var text = $(this).find('.copy-box__text'),
			btn = $(this).find('.copy-box__btn'),
			btnText = btn.text(),
			timeout;

		btn.click(function () {
			navigator.clipboard.writeText(text.text());

			btn.text('Copied');

			clearTimeout(timeout);
			timeout = setTimeout(function () {
				btn.text(btnText);
			}, 3000);
		});
	});

});