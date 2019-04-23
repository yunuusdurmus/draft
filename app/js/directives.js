'use strict';

/* Directives */
angular.module('mag.directives', []).directive('compileHtml', function($compile) {
	return {

		restrict : 'A',
		scope : {
			compileHtml : '='
		},
		replace : true,

		link : function(scope, element, attrs) {

			scope.$watch('compileHtml', function(value) {
				element.html($compile(value)(scope.$parent));
			});
		}
	}
}).directive('makeslider', function() {

	return function(scope, elm, attrs) {

		setTimeout(function() {

			var pCarousel = {
				animationId : null,
				animationDir : 'right',

				//time in miliseconds to wait before scrolling
				animationTimeout : 7000,

				//time in miliseconds for the scrolling transition
				animationSpeed : 500,

				getSliderWrapMethod : function(sliderItemCount) {
					return (sliderItemCount > 1) ? 'circular' : '';
				},

				init : function(carousel) {
					// Disable autoscrolling if the user clicks the prev or next button.
					carousel.clip.hover(function() {
						pCarousel.halt()
					}, function() {
						pCarousel.animate(carousel);
					});
					pCarousel.animate(carousel);

					jQuery('a.pCarouselNext').bind('click', function() {
						pCarousel.halt();
						carousel.next();
						return false;
					});

					jQuery('a.pCarouselPrev').bind('click', function() {
						pCarousel.halt();
						carousel.prev();
						return false;
					});

					jQuery('a.pCarouselStop').bind('click', function() {
						pCarousel.halt();
						return false;
					});

					jQuery('a.pCarouselStart').bind('click', function() {
						if (pCarousel.animationId) {//already running
							pCarousel.halt();
							carousel.scroll(1);
							pCarousel.animationDir = 'right';
						}

						pCarousel.animate(carousel);
						return false;
					});

				},

				animate : function(carousel) {
					pCarousel.animationId = setInterval(function() {
						carousel.next();
					}, pCarousel.animationTimeout);
				},

				halt : function() {
					if (pCarousel.animationId) {
						clearInterval(pCarousel.animationId);
					}
				}
			};

			var items = elm.attr('src') ? elm.attr('src').split(',') : '';
			var ul = angular.element('<ul class="jcarousel-skin-tango"></ul>');

			// append the carousel into DOM
			elm.append(ul);
			ul.jcarousel({
				scroll : 1,
				wrap : pCarousel.getSliderWrapMethod(items.length),
				initCallback : pCarousel.init,
				easing : 'linear',
				animation : pCarousel.animationSpeed,
				buttonPrevHTML : '<div></div>',
				buttonNextHTML : '<div></div>',
				itemFallbackDimension : 580
			});

			// dynamically add items
			angular.forEach(items, function(img, i) {
				ul.jcarousel('add', i + 1, '<img src="/contentImages/contentSlider/580_240_' + img + '" />');
			});
			ul.jcarousel('size', items.length);

		}, 500);

	};

}).directive('onLastRepeat', function() {
    return function(scope, element, attrs) {
        if (scope.$last) setTimeout(function(){
            scope.$emit('onRepeatLast', element, attrs);
        }, 1);
    };
});
