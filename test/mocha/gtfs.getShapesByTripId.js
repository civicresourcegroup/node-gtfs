
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

describe('gtfs.getShapesByTripId(): ', () => {
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

  it('should return shape for the trip_id specified', (done) => {
    const tripId = '23a';
    gtfs.getTripById(agenciesFixtures[0].agency_key, tripId, (err,res) => {
      const expectedShapeId = res.shape_id;
      gtfs.getShapeByTripId(agenciesFixtures[0].agency_key, tripId, (er, resp) => {
        resp.should.matchEach((i) => i.should.have.properties({'shape_id': expectedShapeId}));
      });
    });
    done();
  });
});
