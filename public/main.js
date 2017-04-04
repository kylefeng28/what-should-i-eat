'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = new Vue({
	el: '#app',
	data: {
		searchTerm: '',
		locationPicked: 'mine',
		location: '',
		geolocation: undefined,
		output: {
			message: '',
			show: false,
			success: true,
			results: undefined
		}
	},
	computed: {},
	methods: {
		getGeolocation: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				var geo;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return new Promise(function (resolve, reject) {
									navigator.geolocation.getCurrentPosition(function (pos) {
										console.log('Geolocation: ', pos);
										resolve(pos);
									});
								});

							case 2:
								geo = _context.sent;


								this.geolocation = geo;

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getGeolocation() {
				return _ref.apply(this, arguments);
			}

			return getGeolocation;
		}(),

		getOutput: function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
				var params, result, exclamations, exclamation;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								console.log('Searching for ' + this.searchTerm);

								// TODO try catch
								_context2.prev = 1;
								params = {
									term: this.searchTerm
								};

								if (!(this.locationPicked === 'mine')) {
									_context2.next = 12;
									break;
								}

								if (this.geoLocation) {
									_context2.next = 7;
									break;
								}

								_context2.next = 7;
								return this.getGeolocation();

							case 7:
								params.latitude = this.geolocation.coords.latitude;
								params.longitude = this.geolocation.coords.longitude;
								console.log('p', params);
								_context2.next = 13;
								break;

							case 12:
								if (this.locationPicked === 'custom') {
									params.location = this.location;
								}

							case 13:
								_context2.next = 15;
								return axios.get('/api/search', { params: params });

							case 15:
								result = _context2.sent;


								this.output.results = result.data;
								console.log('Received result: ', result);

								if (this.output.results.total == 0) {
									this.output.message = 'I couldn\'t find any results, sorry!';
									this.output.success = false;
								} else if (this.output.results.total > 20) {
									exclamations = ['Woah, ', 'Sweet, ', 'Awesome, '];
									exclamation = exclamations[Math.floor(Math.random() * exclamations.length)];

									this.output.message = exclamation + 'I found ' + this.output.results.total + ' matches! Here are the first 20:';
									this.output.success = true;
								} else {
									this.output.message = 'I found ' + this.output.results.total + ' matches!';
									this.output.success = true;
								}
								this.scrollToResults();
								_context2.next = 29;
								break;

							case 22:
								_context2.prev = 22;
								_context2.t0 = _context2['catch'](1);

								console.log('Error: ', _context2.t0);
								this.output.message = 'There was a problem with your search! Perhaps try again later?';
								this.output.results = null;
								this.output.success = false;
								this.scrollToResults();

							case 29:
								_context2.prev = 29;

								this.output.show = true;
								return _context2.finish(29);

							case 32:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this, [[1, 22, 29, 32]]);
			}));

			function getOutput() {
				return _ref2.apply(this, arguments);
			}

			return getOutput;
		}(),

		scrollToInput: function scrollToInput() {
			$('html, body').animate({
				scrollTop: $('#input').offset().top
			}, 500);
		},

		scrollToResults: function scrollToResults() {
			$('html, body').animate({
				scrollTop: $('#results').offset().top
			}, 500);
		}
	},
	filters: {
		join: function join(arr, separator) {
			return arr.join(separator);
		},
		getStarsImage: function getStarsImage(rating) {
			// Half ratings
			switch (rating) {
				case 1.5:
					rating = '1_half';break;
				case 2.5:
					rating = '2_half';break;
				case 3.5:
					rating = '3_half';break;
				case 4.5:
					rating = '4_half';break;
			}

			var src = '/yelp_stars/web_and_ios/regular_' + rating + '.png';
			return src;
		}
	},
	mounted: function mounted() {
		this.getGeolocation();
	}
});