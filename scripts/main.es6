let app = new Vue({
	el: '#app',
	data: {
		searchTerm: 'Chinese food',
		locationPicked: 'mine',
		location: 'Chapel Hill, NC',
		geolocation: undefined,
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
		getGeolocation: async function() {
			let geo = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition((pos) => {
					console.log('Geolocation: ', pos);
					resolve(pos);
				});
			});

			this.geolocation = geo;
		},

		getOutput: async function () {
			console.log('Searching for ' + this.searchTerm);

			// TODO try catch
			try {
				let params = {
					term: this.searchTerm,
				};
				if (this.locationPicked === 'mine') {
					await this.getGeolocation();
					params.latitude = this.geolocation.coords.latitude;
					params.longitude = this.geolocation.coords.longitude;
					console.log('p', params);
				}
				else if (this.locationPicked === 'custom') {
					params.location = this.location;
				}

				const result = await axios.get('/api/search', { params: params });

				this.output.results = result.data;
				console.log('Received result: ', result);

				if (this.output.results.total == 0) {
					this.output.message = 'I couldn\'t find any results, sorry!';
					this.output.success = false;
				}
				else if (this.output.results.total > 20) {
					let exclamations = ['Woah, ', 'Sweet, ', 'Awesome, '];
					let exclamation = exclamations[Math.floor(Math.random() * exclamations.length)];
					this.output.message = exclamation + 'I found ' + this.output.results.total + ' matches! Here are the first 20:';
					this.output.success = true;
				}
				else {
					this.output.message = 'I found ' + this.output.results.total + ' matches!';
					this.output.success = true;
				}
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

			let src = '/yelp_stars/web_and_ios/regular_' + rating + '.png';
			return src;
		}
	}
});
