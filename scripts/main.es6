var app = new Vue({
	el: '#app',
	data: {
		searchTerm: 'Chinese food',
		location: 'Cary, NC',
		output: {
			message: '',
			show: false,
			success: true,
			results: undefined
		}
	},
	computed: {
	},
	methods: {
		getOutput: async function () {
			console.log('Searching for ' + this.searchTerm);

			// TODO try catch
			try {
				const result = await axios.get('/api/search', {
					params: {
						term: this.searchTerm,
						location: this.location
					}
				});

				this.output.results = result.data;
				console.log('Received result: ', result);

				if (this.output.results.total > 20) {
					this.output.message = 'Woah, I found ' + this.output.results.total + ' matches! Here are the first 20:';
				}
				else {
					this.output.message = 'I found ' + this.output.results.total + ' matches!';
				}
				this.output.success = true;
			}
			catch (e) {
				console.log('Error: ', e);
				this.output.message = 'There was a problem with your search! Perhaps try again later?'
				this.output.results = null;
				this.output.success = false;
			}
			finally {
				this.output.show = true;
			}
			
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
