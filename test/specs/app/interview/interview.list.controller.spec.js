describe('Controller: ListInterviewController', function () {
  'use strict'
  beforeEach(module('App'))
  var ListInterviewController
  var scope
  var interviews = []

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new()
    ListInterviewController = $controller('ListInterviewController as vm', {interviews: interviews, $scope: scope})
  }))

  it('should define ListInterviewController and have all necessary properties setup', function () {
    expect(ListInterviewController).toBeDefined()
    expect(ListInterviewController.interviews).toBeDefined()
  })
})
