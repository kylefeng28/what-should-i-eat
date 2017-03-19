var app = new Vue({
	el: '#app',
	data: {
		searchTerm: 'pizza',
		location: 'san francisco, ca',
		output: ''
	},
	computed: {
	},
	methods: {
		getOutput: function () {
			console.log('Searching for ' + this.searchTerm);

			Vue.axios.get('/api/search', {
				params: {
					term: this.searchTerm,
					location: this.location
				}
			}).then((result) => {
				this.output = result;
			})
		}
	}
});
