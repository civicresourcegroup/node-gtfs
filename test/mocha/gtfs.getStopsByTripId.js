

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

describe('gtfs.getStopsByTripId(): ', () => {
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

  it('should return stops by trip id specified', (done) => {
    const tripId = '23a';
    let stop_ids = [];
    gtfs.getStopsByTripId(agenciesFixtures[0].agency_key, tripId, (err, res) => {
      stop_ids = res.map(i => i.stop_id).sort();
      gtfs.getStoptimesByTrip(agenciesFixtures[0].agency_key, tripId, (er, resp) => {
        const expected = resp.map(i => i.stop_id).sort();
        stop_ids.should.be.eql(expected);
      });
    });
    done();
  });
});
