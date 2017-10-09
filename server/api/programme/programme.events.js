/**
 * Programme model events
 */

'use strict';

import {EventEmitter} from 'events';
var Programme = require('../../sqldb').Programme;
var ProgrammeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProgrammeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Programme) {
  for(var e in events) {
    let event = events[e];
    Programme.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    ProgrammeEvents.emit(event + ':' + doc._id, doc);
    ProgrammeEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Programme);
export default ProgrammeEvents;
