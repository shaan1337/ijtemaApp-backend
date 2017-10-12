'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './leaderboard.routes';

export class LeaderboardComponent {
  /*@ngInject*/
  constructor($scope,$http) {
    var ctx = this;

    $scope.teamname = "";    
    this.loadTeams($scope,$http);

    $scope.addTeam = function(){
      $http.post('/api/leaderboard',{team: $scope.teamname.toUpperCase()})
      .then(
      (res) => {        
        $scope.teamname = "";
        ctx.loadTeams($scope,$http);
      },
      (res) => {
        alert('Error!');
        console.log(res);
      }
      );
    }

    $scope.updatePoints = function(){
      for(var teamName in $scope.teams){
        var team = $scope.teams[teamName];

        var patches = [
          {op: 'replace', path: '/score', value: parseInt(team.score)}
        ];

        $http.patch('/api/leaderboard/'+team._id, patches)
        .then(
        (res) => {
          ctx.loadTeams($scope,$http);
        },
        (res) => {
          alert('Error, please try again!');
          console.log(res);
        }
        );
      }
  
    }
    
    $scope.deleteTeam = function(teamId){
      if(!confirm("Are you sure?"))
        return;

      $http.delete('/api/leaderboard/'+teamId)
      .then(
      (res) => {        
        ctx.loadTeams($scope,$http);
      },
      (res) => {
        alert('Error!');
        console.log(res);
      }
      );
    }
  }

  loadTeams($scope,$http){
    $http.get('/api/leaderboard')
    .then(
    (res) => {
      $scope.teams = res.data;
    },
    (res) => {
      alert('Error!');
      console.log(res);
    }
    );    
  }
}

export default angular.module('ijtemaAppBackendApp.leaderboard', [uiRouter])
  .config(routes)
  .component('leaderboard', {
    template: require('./leaderboard.html'),
    controller: LeaderboardComponent,
    controllerAs: 'leaderboardCtrl'
  })
  .name;
