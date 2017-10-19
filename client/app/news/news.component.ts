'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './news.routes';

export class NewsComponent {
  /*@ngInject*/
  constructor($scope,$http, Auth) {
    Auth.getCurrentUser().then(function(me) {
      $scope.author = me.name;
    });

    $scope.subject = '';
    $scope.message = '';
    $scope.link = '';
    $scope.linkName = '';

    $scope.submitNews = function(){
      $http.post('/api/news',
      {
        subject: $scope.subject,
        message: $scope.message,
        link: $scope.link,
        linkName: $scope.linkName
      })
      .then(
      (res) => {        
        alert('Successfully submitted!');
        $scope.subject = '';
        $scope.message = '';
      },
      (res) => {
        alert('Error!');
        console.log(res);
      }
      );
    }
    
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
