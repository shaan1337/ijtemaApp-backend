/**
 * FirebaseRegistration model events
 */

'use strict';

import {EventEmitter} from 'events';
var FirebaseRegistration = require('../../sqldb').FirebaseRegistration;
var FirebaseRegistrationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FirebaseRegistrationEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(FirebaseRegistration) {
  for(var e in events) {
    let event = events[e];
    FirebaseRegistration.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    FirebaseRegistrationEvents.emit(event + ':' + doc._id, doc);
    FirebaseRegistrationEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(FirebaseRegistration);
export default FirebaseRegistrationEvents;
