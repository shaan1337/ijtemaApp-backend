/**
 * Personaldetails model events
 */

'use strict';

import {EventEmitter} from 'events';
var Personaldetails = require('../../sqldb').Personaldetails;
var PersonaldetailsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PersonaldetailsEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Personaldetails) {
  for(var e in events) {
    let event = events[e];
    Personaldetails.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    PersonaldetailsEvents.emit(event + ':' + doc._id, doc);
    PersonaldetailsEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Personaldetails);
export default PersonaldetailsEvents;
