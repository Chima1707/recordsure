(function () {
  'use strict'

  angular
        .module('App')
        .config(stateConfig)

  stateConfig.$inject = ['$stateProvider']

  function stateConfig ($stateProvider) {
    $stateProvider.state('app', {
      abstract: true,
      views: {
        'navbar@': {
          templateUrl: 'app/layouts/navbar/navbar.html',
          controller: 'NavbarController',
          controllerAs: 'vm'
        }
      }
    })
  }
})()
