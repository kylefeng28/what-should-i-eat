var app = new Vue({
	el: '#app',
	data: {
		// searchTerm: 'Chinese food',
		searchTerm: 'Today Asian Market',
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
		join: (arr, separator) => arr.join(separator)
	}
});
