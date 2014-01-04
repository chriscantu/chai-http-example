var chai = require('chai'),
	config = require('./config.js'),
	expect = chai.expect,
	chaiHttp = require('chai-http');
	
chai.use(chaiHttp);

var request = chai.request(config.baseUrl);

describe('/polls', function () {
	var pollId;
	it('GET list of polls', function (done) {
		request
			.get('/polls')
			.res( function (res) {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.be.empty;
				done();
			});
	});

	it('POST - create a new poll', function (done) {
		request
			.post('/polls')
			.req( function(req) {
				req.send({ title: 'My Test1', category: 1, description: 'Automated'});
			})
			.res( function (res) {
				expect(res).to.be.json;
				expect(res).to.have.status(201);
				expect(res.body._id).to.not.be.empty;
				pollId = res.body._id;
				done();
			});
	});

	it('GET a single poll', function (done) {
		request
			.get('/polls/' + pollId)
			.res( function (res) {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.not.be.empty;
				done();
			});
	});

	it('PUT - update a poll', function (done) {
		request
			.put('/polls/' + pollId)
			.res( function (res) {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.not.be.empty;
				done();
			});
	});

	it('DELETE a single poll', function (done) {
		request
			.del('/polls/' + pollId)
			.res( function (res) {
				expect(res).to.have.status(200);
				expect(res.body).to.not.be.empty;
				done();
			});
	});
});