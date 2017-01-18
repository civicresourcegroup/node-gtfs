const _ = require('lodash');

const Trip = require('../../models/Trip');
const StopTime = require('../../models/StopTime');

/*
* Retuns an array of trips for the 'route_id' specified
*/
exports.getTripsByRouteId = (agency_key, route_id, cb) => {
  const query = {
    agency_key,
    route_id
  };

  function getSorted(arr, sortArr) {
    var result = [];
    for(var i=0; i<arr.length; i++) {
      result[i] = getByValue(arr,[sortArr[i]]);
    }
    return result;
   }

   function getByValue(arr, value) {
     for (var i=0, iLen=arr.length; i<iLen; i++) {
       if (arr[i].trip_id == value) return arr[i];
     }
   }

  return Trip.find(query).exec().then(trips => {
    const tripIds= trips.map(i=>i.trip_id)
    StopTime.find({trip_id:{$in:tripIds}}).sort({arrival_time:1}).exec().then(stopTimes => {
        const sortedTripIds = stopTimes.map(i=>i.trip_id).filter((item, i, ar) =>  ar.indexOf(item) === i );
        Trip.find(query).select('-_id').exec().then(data => cb(null, getSorted(data,sortedTripIds)),cb)
      })
    });
};

/*
*
*/
exports.getTripById = (agency_key,trip_id,cb) => {
  const query = {
    agency_key,
    trip_id
  };
  return Trip.findOne(query).exec(cb);
}

/*
 * Returns an array of trips for the `agency_key`, `route_id` and
 * `direction_id` specified
 */
exports.getTripsByRouteAndDirection = (agency_key, route_id, direction_id, service_ids, cb) => {
  if (_.isFunction(service_ids)) {
    cb = service_ids;
    service_ids = undefined;
  }

  const query = {
    agency_key,
    route_id
  };

  if (_.includes([0, 1], direction_id)) {
    query.direction_id = direction_id;
  } else {
    query.direction_id = {
      $nin: [0, 1]
    };
  }

  if (service_ids && service_ids.length) {
    query.service_id = {
      $in: service_ids
    };
  }

  return Trip.find(query).exec(cb);
};


/*
 * Returns an array of directions for the `agency_key` and `route_id` specified
 */
exports.getDirectionsByRoute = (agency_key, route_id, service_ids, cb) => {
  if (_.isFunction(service_ids)) {
    cb = service_ids;
    service_ids = undefined;
  }

  const query = {
    agency_key,
    route_id
  };

  if (service_ids && service_ids.length) {
    query.service_id = {
      $in: service_ids
    };
  }

  return Trip.aggregate([
    { $match: query },
    { $group: { _id: { trip_headsign: '$trip_headsign', direction_id: '$direction_id' } } }
  ]).then((results) => {
    const directions = results.map(direction => ({
      route_id,
      trip_headsign: direction._id.trip_headsign,
      direction_id: direction._id.direction_id
    }));


    if (cb) {
      cb(null, directions);
    }
    return directions;
  }, cb);
};
