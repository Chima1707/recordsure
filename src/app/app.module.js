(function () {
  'use strict'

  angular
        .module('App', [
          'ui.router',
          'datePicker',
          'LocalForageModule',
          'ngSanitize',
          'ngMessages',
          'toastr'
        ])
        .config(config)
        .constant('INTERVIEW_PURPOSE', [
          'Visa', 'Permanent residence'
        ])
        .constant('CITIES', [
          'London', 'Brighton', 'Belfast', 'Cardiff', 'New Castle', 'Elsewhere'
        ])
        .value('moment', moment)

  config.$inject = ['$urlRouterProvider']
  function config ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/new-interview')
  }
})()
