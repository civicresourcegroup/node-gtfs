const FeedInfo = require('../../models/FeedInfo');

/*
 * Returns feed_info for the agency_key specified
 */
exports.getFeedInfo = (agency_key, cb) => FeedInfo.findOne({
  agency_key
}).exec(cb);
