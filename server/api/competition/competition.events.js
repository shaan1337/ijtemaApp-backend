/**
 * Competition model events
 */

'use strict';

import {EventEmitter} from 'events';
var Competition = require('../../sqldb').Competition;
var CompetitionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CompetitionEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Competition) {
  for(var e in events) {
    let event = events[e];
    Competition.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    CompetitionEvents.emit(event + ':' + doc._id, doc);
    CompetitionEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Competition);
export default CompetitionEvents;
