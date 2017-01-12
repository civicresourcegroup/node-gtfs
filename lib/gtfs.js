// GTFS import script
const importGTFS = require('./import');

// Standard GTFS Filenames
const agencies = require('./gtfs/agencies');
const calendars = require('./gtfs/calendars');
const calendarDates = require('./gtfs/calendar_dates');
const fareAttributes = require('./gtfs/fare_attributes');
const fareRules = require('./gtfs/fare_rules');
const feedInfo = require('./gtfs/feed_info');
const routes = require('./gtfs/routes');
const shapes = require('./gtfs/shapes');
const stops = require('./gtfs/stops');
const stopTimes = require('./gtfs/stop_times');
const trips = require('./gtfs/trips');

// Non-standard GTFS Filenames
const stopAttributes = require('./gtfs/stop_attributes');
const timetables = require('./gtfs/timetables');
const timetableStopOrder = require('./gtfs/timetable_stop_order');
const timetablePages = require('./gtfs/timetable_pages');

exports.import = importGTFS;

exports.agencies = agencies.agencies;
exports.getAgency = agencies.getAgency;
exports.getAgenciesByDistance = agencies.getAgenciesByDistance;

exports.getAllRouteIds = routes.getAllRouteIds;
exports.getRoutesByAgency = routes.getRoutesByAgency;
exports.getRoutesById = routes.getRoutesById;
exports.getRoutesByDistance = routes.getRoutesByDistance;
exports.getRoutesByStop = routes.getRoutesByStop;

exports.getAllStopIds = stops.getAllStopIds;
exports.getStops = stops.getStops;
exports.getStopsByTripId = stops.getStopsByTripId;
exports.getStopsByRoute = stops.getStopsByRoute;
exports.getStopsByDistance = stops.getStopsByDistance;

exports.getStoptimesByTrip = stopTimes.getStoptimesByTrip;
exports.getStoptimesByStop = stopTimes.getStoptimesByStop;

exports.getTripsByRouteId = trips.getTripsByRouteId;
exports.getTripById = trips.getTripById;
exports.getTripsByRouteAndDirection = trips.getTripsByRouteAndDirection;
exports.getDirectionsByRoute = trips.getDirectionsByRoute;

exports.getAllShapeIds = shapes.getAllShapeIds;
exports.getShapeByTripId = shapes.getShapeByTripId;
exports.getShapesByRoute = shapes.getShapesByRoute;

exports.getCalendars = calendars.getCalendars;
exports.getCalendarsByService = calendars.getCalendarsByService;

exports.getAllCalendarDates = calendarDates.getAllCalendarDates;
exports.getCalendarDatesByService = calendarDates.getCalendarDatesByService;

exports.getFeedInfo = feedInfo.getFeedInfo;

exports.getFareAttributesById = fareAttributes.getFareAttributesById;

exports.getFareRulesByRouteId = fareRules.getFareRulesByRouteId;

exports.getStopAttributes = stopAttributes.getStopAttributes;

exports.getTimetablesByAgency = timetables.getTimetablesByAgency;
exports.getTimetable = timetables.getTimetable;

exports.getTimetableStopOrders = timetableStopOrder.getTimetableStopOrders;

exports.getTimetablePagesByAgency = timetablePages.getTimetablePagesByAgency;
exports.getTimetablePage = timetablePages.getTimetablePage;
