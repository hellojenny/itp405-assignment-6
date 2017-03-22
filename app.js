var express = require('express');
var app = express();
var mysql = require('mysql');
 
app.get('/api/dvds/:id', function (request, response) {
	var connection = mysql.createConnection({
		host: 'itp460.usc.edu',
		user: 'student',
		password: 'ttrojan',
		database: 'dvd'
	});

	var dvdID = request.params.id;
	connection.query('SELECT * FROM dvds, genres, ratings WHERE dvds.id = ? AND dvds.genre_id = genres.id AND dvds.rating_id = ratings.id', [dvdID], function(error, dvds) {
		if (error) {
			throw error;
		}

		response.json({
			title: dvds[0].title,
			award: dvds[0].award,
			genre: {
				id: dvds[0].genre_id,
				genre_name: dvds[0].genre_name
			},
			rating: {
				id: dvds[0].rating_id,
				rating_name: dvds[0].rating_name
  			}});
		connection.end();
	});
});
 
app.listen(3000);