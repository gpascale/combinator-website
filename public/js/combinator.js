(function() {

	$(document).ready(function() {

		var _pushedAnything = false;

		// Inspect the path to see if we should open a different tab
		var reMatch = /^\/(home|music|photos|video|bio)\/?$/.exec(window.location.pathname);
		var tab = reMatch ? reMatch[1] : 'home';
		openTab(tab, false);

		window.onpopstate = function(event) {
			// Fuck you, WebKit
			if (event.state || _pushedAnything)
				openTab(event.state, false);
		};

		function openTab(tabName, doPushState) {
			if (!tabName)
				tabName = 'home';

			// bring the new div in and the old div out if there was one
			var oldDiv = $('.contentSection.active');
			var newDiv = $('.contentSection.' + tabName);
			newDiv.addClass('active');
			newDiv.hide();
			if (oldDiv.length > 0 && !oldDiv.is(newDiv)) {
				oldDiv.removeClass('active');
				oldDiv.fadeOut({
					duration: '300', 
					fail: function() { 
						oldDiv.hide(); 
					},
					always: function() {
						newDiv.fadeIn('300');
					}
				});
			}
			else {
				newDiv.show();
			}

			// synchronize the tab selection
			var $pill = $('.' + tabName + 'Nav');
			$pill.parent().children('li').removeClass('active');
			$pill.addClass('active');

			// use push state to synchronize the URL
			if (doPushState) {
				window.history.pushState(tabName, null, '/' + tabName);
				_pushedAnything = true;
			}
		}

		// Nav click handlers
		$('.nav').on('click', 'li a', function() {
			var classNameByIndex = [
				'home',
				'music',
				'photos',
				'video',
				'bio'
			];

			var index = $(this).parent().index();
			openTab(classNameByIndex[index], true);

			return false;
		});

		// fancybox
		$(".fancybox").attr('rel', 'photos').fancybox();

	});
}());