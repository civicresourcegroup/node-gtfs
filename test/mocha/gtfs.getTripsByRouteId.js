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

describe('gtfs.getTripsByRouteId(): ', () => {
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

  it('should return empty array for invalid route id', (done) => {
    const invalidRouteId = 'not-real';
    gtfs.getTripsByRouteId(agenciesFixtures[0].agency_key, invalidRouteId, (err, res) => {
      should.not.exist(err);
      res.should.be.Array();
      res.should.have.length(0);
    });
    done();
  });
  it('should return trips array for route id specified', (done) => {
    const routeId = 'TaSj-16APR';
    gtfs.getTripsByRouteId(agenciesFixtures[0].agency_key, routeId, (err, res) => {
      should.not.exist(err);
      res.should.be.Array();
      res.should.not.have.length(0);

      randomIndex = Math.floor(Math.random() * res.length);
      res[randomIndex].should.have.properties({ route_id: routeId });
    });
    done();
  });
});
