(function () {
  'use strict'

  angular
        .module('App')
        .controller('NewInterviewController', NewInterviewController)

  NewInterviewController.$inject = ['Interview', 'INTERVIEW_PURPOSE', 'CITIES', 'toastr', 'moment']

  /**
  * NewInterviewController.
  * *@param {Object} Interview- Interview Service
  * *@param {Array} INTERVIEW_PURPOSE- purposes for interview
  * *@param {Array} CITIES- cities list
  * *@param {Object} toastr- toastr to display messages
  * *@param {Object} moment- momentjs object
  */
  function NewInterviewController (Interview, INTERVIEW_PURPOSE, CITIES, toastr, moment) {
    var vm = this
    vm.data = getDate()
    vm.cities = CITIES
    vm.purposes = INTERVIEW_PURPOSE
    vm.create = create
    vm.generateId = generateId

    /**
    * creates a new interview.
    * *@param {Object} form- form
    */
    function create (form) {
      vm.data.date = vm.data.date ? vm.data.date.format() : ''
      Interview.save(vm.data)
      .then(function () {
        toastr.success('Saved successfully', 'Success')
        vm.data = getDate()
        form.$setPristine(true)
      })
      .catch(function (error) {
        toastr.error('Error saving data ' + error, 'Error')
      })
    }

    /**
    * generates a new unique interview Id.
    */
    function generateId () {
      var generatedId = Interview.generateId()
      vm.data.interviewId = generatedId
    }

    function getDate () {
      return {date: moment()}
    }
  }
})()
