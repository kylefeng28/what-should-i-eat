var app = new Vue({
	el: '#app',
	data: {
		searchTerm: 'Chinese food',
		location: 'Cary, NC',
		output: null
	},
	computed: {
	},
	methods: {
		getOutput: async function () {
			console.log('Searching for ' + this.searchTerm);

			// TODO try catch
			const result = await axios.get('/api/search', {
				params: {
					term: this.searchTerm,
					location: this.location
				}
			});
			
			this.output = result.data;
			console.log(this.output);
		}
	},
	filters: {
		join: (arr, separator) => arr.join(separator),
		getStarsImage: (rating) => {
			// Half ratings
			switch (rating) {
				case 1.5: rating = '1_half'; break;
				case 2.5: rating = '2_half'; break;
				case 3.5: rating = '3_half'; break;
				case 4.5: rating = '4_half'; break;
			}

			var src = '/yelp_stars/web_and_ios/regular_' + rating + '.png';
			return src;
		}
	}
});
