(function() {

	require.config({
		paths: {
			backbone: '../ext/js/backbon-min-1.0.0',
			jquery: '../ext/js/jquery.min-1.10.2',
			underscore: '../ext/js/underscore-min-1.5.1',
			bootstrap: '../ext/bootstrap/js/bootstrap.min',
			fancybox: '../ext/fancybox/source/jquery.fancybox.pack.js?v=2.1.5',
			text: '../ext/js/text'
		}
	});

	require(['jquery', 'underscore', 'fancybox', 'text'], function() {
		init();
	});

	function init() {

		require(['text!../templates/home.tmpl', 'text!../templates/news.tmpl',
			'text!../templates/music.tmpl', 'text!../templates/gallery.tmpl',
			'text!../templates/bio.tmpl'], function(homeTmpl, newsTmpl, musicTmpl, galleryTmpl,
				bioTmpl) {

		});

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

			if (oldDiv) {

			}

			if (!newDiv) {
				require([])
			}

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

		$('#mc_embed_signup').on('click', '.btn', function() {
			var fullName = $('#mce-FULLNAME').val();
			// trim whitespace
			fullName = fullName.replace(/^\s+/, '').replace(/\s+$/, '');
			console.log('fullName = ' + fullName);
			var components = fullName.split(/\b/);
			var firstName = components[0];
			var lastName = components.length > 1 ? components[components.length - 1] : '';
			$('#mc_embed_signup #mce-FIRSTNAME').val(firstName);
			$('#mc_embed_signup #mce-LASTNAME').val(lastName);
			setTimeout(function() {
				$('#mc_embed_signup .input-xlarge').val('');
			});
		})
	}
}());