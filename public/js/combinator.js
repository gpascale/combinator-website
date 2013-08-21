(function() {
	$(document).ready(function() {
		
		// Nav click handlers
		$('.nav').on('click', 'li a', function() {

			var classNameByIndex = [
				'home',
				'news',
				'music',
				'gallery',
				'bio'
			];

			var index = $(this).parent().index();
			var oldDiv = $('.contentSection.active');
			var newDiv = $('.contentSection.' + classNameByIndex[index]);

			if (oldDiv && newDiv) {
				oldDiv.removeClass('active');
				newDiv.addClass('active');

				newDiv.hide();
				oldDiv.fadeOut('300', function() {
					newDiv.fadeIn('300');
				});
			}

			$(this).parent().parent().children('li').removeClass('active');
			$(this).parent().addClass('active');
		});

		// fancybox
		$(".fancybox").attr('rel', 'gallery').fancybox();
	});
}());