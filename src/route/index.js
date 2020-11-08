module.exports = function (app, cors) {

	app.get('/', cors(),
		function (req, res) {
			res.send('blog-backend');
		}
	),

	app.get('/favicon.ico', cors(), 
		function (req, res) {
			res.status(204);
			res.send(null);
		}
	),
	
	require('./user')(app, cors);
}