const _ = require('lodash');

const CalendarDate = require('../../models/CalendarDate');

/*
* Retuns an array of all calendarDates
*/
exports.getAllCalendarDates = (agency_key, cb) => {
  const query = {
    agency_key
  };
  return CalendarDate.find(query).select('-_id').exec(cb);
}

/*
 * Returns an array of calendarDates for the `service_ids` specified
 */
exports.getCalendarDatesByService = (service_ids, cb) => {
  if (!_.isArray(service_ids)) {
    service_ids = [service_ids];
  }

  return CalendarDate.find({
    service_id: {
      $in: service_ids
    }
  }).exec(cb);
};
