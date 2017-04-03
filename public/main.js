'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = new Vue({
	el: '#app',
	data: {
		searchTerm: 'Chinese food',
		location: 'Chapel Hill, NC',
		output: {
			message: '',
			show: false,
			success: true,
			results: undefined
		}
	},
	computed: {},
	methods: {
		getOutput: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				var result;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								console.log('Searching for ' + this.searchTerm);

								// TODO try catch
								_context.prev = 1;
								_context.next = 4;
								return axios.get('/api/search', {
									params: {
										term: this.searchTerm,
										location: this.location
									}
								});

							case 4:
								result = _context.sent;


								this.output.results = result.data;
								console.log('Received result: ', result);

								if (this.output.results.total > 20) {
									this.output.message = 'Woah, I found ' + this.output.results.total + ' matches! Here are the first 20:';
								} else {
									this.output.message = 'I found ' + this.output.results.total + ' matches!';
								}
								this.output.success = true;
								_context.next = 17;
								break;

							case 11:
								_context.prev = 11;
								_context.t0 = _context['catch'](1);

								console.log('Error: ', _context.t0);
								this.output.message = 'There was a problem with your search! Perhaps try again later?';
								this.output.results = null;
								this.output.success = false;

							case 17:
								_context.prev = 17;

								this.output.show = true;
								return _context.finish(17);

							case 20:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[1, 11, 17, 20]]);
			}));

			function getOutput() {
				return _ref.apply(this, arguments);
			}

			return getOutput;
		}()
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
	}
});