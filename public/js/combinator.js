(function() {

	require.config({
		paths: {
			backbone: '../ext/js/backbon-min-1.0.0',
			jquery: '../ext/js/jquery.min-1.10.2',
			underscore: '../ext/js/underscore-min-1.5.1',
			bootstrap: '../ext/bootstrap/js/bootstrap.min',
			fancybox: '../ext/fancybox/source/jquery.fancybox.pack.js?v=2.1.5',
			text: '../ext/js/text',
			domReady: '../ext/js/domReady'
		}
	});

	var _dependenciesLoaded = false;
	var _pageLoaded = false;

	require(['domReady', 'jquery', 'underscore', 'fancybox', 'text'], function(domReady) {
		domReady(go);
		/*_dependenciesLoaded = true;
		if (_pageLoaded)
			go();*/
	});

/*
	$(document).ready(function() {
		_pageLoaded = true;
		if (_dependenciesLoaded)
			go();
	});
*/

	function go() {

		var _pushedAnything = false;
		var _templates = { };

		_templates['home'] = $('#homeTemplate').html();
		_templates['music'] = $('#musicTemplate').html();
		_templates['photos'] = $('#photosTemplate').html();
		_templates['video'] = $('#videoTemplate').html();
		_templates['bio'] = $('#bioTemplate').html();

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
			if (newDiv.length === 0) {
				newDiv = $(_.template(_templates[tabName])());
				newDiv.hide();
				$('.leftContent').append(newDiv);

			}
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
						oldDiv.remove();
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
