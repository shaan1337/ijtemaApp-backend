'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './news.routes';

export class NewsComponent {
  /*@ngInject*/
  constructor($scope,$http) {
    $scope.author = 'John Smith';
    $scope.subject = '';
    $scope.message = '';
    
  }
}

export default angular.module('ijtemaAppBackendApp.news', [uiRouter])
  .config(routes)
  .component('news', {
    template: require('./news.html'),
    controller: NewsComponent,
    controllerAs: 'newsCtrl'
  })
  .name;
