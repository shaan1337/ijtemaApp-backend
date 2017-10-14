/**
 * Registration model events
 */

'use strict';

import {EventEmitter} from 'events';
var Registration = require('../../sqldb').Registration;
var RegistrationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RegistrationEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Registration) {
  for(var e in events) {
    let event = events[e];
    Registration.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    RegistrationEvents.emit(event + ':' + doc._id, doc);
    RegistrationEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Registration);
export default RegistrationEvents;
