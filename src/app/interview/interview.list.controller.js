(function () {
  'use strict'

  angular
        .module('App')
        .controller('ListInterviewController', ListInterviewController)

  ListInterviewController.$inject = ['interviews']

  /**
  * *ListInterviewController
  * *@param {Array} interviews- Array of injected interviews
  */
  function ListInterviewController (interviews) {
    var vm = this
    vm.interviews = interviews
  }
})()
