const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {
  $http;


  /*@ngInject*/
  constructor($http) {
    this.$http = $http;

  }

  $onInit() {

  }

  addThing() {

  }

  deleteThing(thing) {
  }
}

export default angular.module('ijtemaAppBackendApp.main', [
  uiRouter])
    .config(routing)
    .component('main', {
      template: require('./main.html'),
      controller: MainController
    })
    .name;
