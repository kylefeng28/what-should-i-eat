'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = new Vue({
	el: '#app',
	data: {
		searchTerm: 'Chinese food',
		location: 'Cary, NC',
		output: null
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
								_context.next = 3;
								return axios.get('/api/search', {
									params: {
										term: this.searchTerm,
										location: this.location
									}
								});

							case 3:
								result = _context.sent;


								this.output = result.data;
								console.log(this.output);

							case 6:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
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