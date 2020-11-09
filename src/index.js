var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('../swagger.json');


var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./route')(app, cors);


app.listen(8000, function () {
	console.log('server listening on port 8000')
})