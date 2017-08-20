(function () {
  'use strict'
  angular
        .module('App')
        .config(stateConfig)

  stateConfig.$inject = ['$stateProvider']

  function stateConfig ($stateProvider) {
    $stateProvider.state('new-interview', {
      parent: 'app',
      url: '/new-interview',
      views: {
        'content@': {
          templateUrl: 'app/interview/interview.new.html',
          controller: 'NewInterviewController',
          controllerAs: 'vm'
        }
      }
    })
    $stateProvider.state('list-interview', {
      parent: 'app',
      url: '/list-interview',
      views: {
        'content@': {
          templateUrl: 'app/interview/interview.list.html',
          controller: 'ListInterviewController',
          controllerAs: 'vm'
        }
      },
      resolve: {
        interviews: ['Interview',
          function (Interview) {
            return Interview.getAll()
          }
        ]
      }
    })
  }
})()
