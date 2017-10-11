/**
 * Leaderboard model events
 */

'use strict';

import {EventEmitter} from 'events';
var Leaderboard = require('../../sqldb').Leaderboard;
var LeaderboardEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LeaderboardEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Leaderboard) {
  for(var e in events) {
    let event = events[e];
    Leaderboard.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    LeaderboardEvents.emit(event + ':' + doc._id, doc);
    LeaderboardEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Leaderboard);
export default LeaderboardEvents;
