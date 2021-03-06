const async = require('async');
const path = require('path');
const should = require('should');

// libraries
const config = require('../config.json');
const gtfs = require('../../');


// test support
const database = require('../support/database');

// setup fixtures
const agenciesFixtures = [{
  agency_key: 'caltrain',
  path: path.join(__dirname, '../fixture/caltrain_20160406.zip')
}];

config.agencies = agenciesFixtures;

describe('gtfs.getAllRouteIds(): ', () => {
  before((done) => {
    database.connect(config, done);
  });

  after((done) => {
    async.series({
      teardownDatabase: (next) => {
        database.teardown(next);
      },
      closeDb: (next) => {
        database.close(next);
      }
    }, done);
  });

  beforeEach((done) => {
    async.series({
      teardownDatabase: (next) => {
        database.teardown(next);
      },
      executeDownloadScript: (next) => {
        gtfs.import(config, next);
      }
    }, done);
  });

  it('should return route ids', (done) => {
    gtfs.getAllRouteIds(agenciesFixtures[0].agency_key, (err, res) => {
      res = res.map(i => i.route_id);
      let randomIndex = 0;

      should.not.exist(err);
      should.exist(res);
      res.should.be.Array();

      randomIndex = Math.floor(Math.random() * res.length);
      res[randomIndex].should.be.String();
    });
    done();
  });
});
