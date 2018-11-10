const request = require('request');
const cheerio = require('cheerio');

const MAIN_URL = 'https://ndb.nal.usda.gov/ndb/search/list?&qlookup=';

const lookupFood = (item, callback) => {

	request(MAIN_URL + item, (err, resp, body) => {
		if (err) {
			console.log('Error in retrieving: %j Err: %j', item, err);
		} else {
			var $ = cheerio.load(body);
			// console.log('Body: %j', body);
			$('td').each((i, elem) => {
				if ($(elem).find('a').attr('href') && $(elem).find('a').attr('href').indexOf('ndb/foods/show') > 0) {
					console.log('TD %s: %s', i, $(elem).text());
				}
			});
		}
	});
};

lookupFood('Carrot', (err, results) => {
	if (err) {
		console.log('Error could not find: %j', err);
	} else {
		console.log('Success here are the results: %j', results);
	}	
});