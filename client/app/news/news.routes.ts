'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('news', {
      url: '/news',
      template: '<news></news>'
    });
}
