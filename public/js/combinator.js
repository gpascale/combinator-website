(function() {
	$(document).ready(function() {

		// Inspect the path to see if we should open a different tab
		var reMatch = /^\/(home|music|photos|video|bio)\/?$/.exec(window.location.pathname);
		if (reMatch) {
			openTab(reMatch[1]);
		}

		function openTab(tabName) {
			
			// bring the new div in and the old div out if there was one
			var oldDiv = $('.contentSection.active');
			var newDiv = $('.contentSection.' + tabName);
			newDiv.addClass('active');
			newDiv.hide();
			if (oldDiv.length > 0) {
				oldDiv.removeClass('active');
				oldDiv.fadeOut('300', function() {
					newDiv.fadeIn('300');
				});
			}
			else {
				newDiv.fadeIn('300');
			}

			// synchronize the tab selection
			var $pill = $('.' + tabName + 'Nav');
			$pill.parent().children('li').removeClass('active');
			$pill.addClass('active');

			// use push state to synchronize the URL
			window.history.pushState(null, null, '/' + tabName);
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
			openTab(classNameByIndex[index]);

			return false;
		});

		// fancybox
		$(".fancybox").attr('rel', 'photos').fancybox();

	});
}());