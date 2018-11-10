const request = require('request');
const cheerio = require('cheerio');

const MAIN_URL = 'https://ndb.nal.usda.gov/ndb/search/list?&qlookup=';

const lookupFood = (item, callback) => {

	request(MAIN_URL + item, (err, resp, body) => {
		if (err) {
			console.log('Error in retrieving: %j Err: %j', item, err);
		} else {
			var $ = cheerio.load(body);
			var count = 0;
			// console.log('Body: %j', body);
			$('td').each((i, elem) => {
				if ($(elem).find('a').attr('href') && $(elem).find('a').attr('href').indexOf('ndb/foods/show') > 0) {
					if (isNaN($(elem).text())) {
						count++;
						console.log('%s // %s', count, $(elem).text().trim());
					}
				}
			});
		}
	});
};

lookupFood('Milk', (err, results) => {
	if (err) {
		console.log('Error could not find: %j', err);
	} else {
		console.log('Success here are the results: %j', results);
	}	
});