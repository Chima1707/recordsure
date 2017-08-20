describe('Controller: NewInterviewController', function () {
  'use strict'
  beforeEach(module('App'))
  var NewInterviewController
  var scope
  var deferred
  var toastr
  var Interview
  var form
  var interviewId = '#1234FGHJK09BN'

  beforeEach(inject(function ($controller, $rootScope, $q, _toastr_, _Interview_) {
    scope = $rootScope.$new()
    deferred = $q.defer()
    toastr = _toastr_
    Interview = _Interview_

    spyOn(Interview, 'generateId').and.callFake(function () {
      return interviewId
    })
    spyOn(Interview, 'save').and.callFake(function () {
      return deferred.promise
    })
    spyOn(toastr, 'error')
    spyOn(toastr, 'success')
    form = jasmine.createSpyObj('form', ['$setPristine'])
    NewInterviewController = $controller('NewInterviewController as vm', {$scope: scope, Interview: Interview})
  }))

  it('should define NewInterviewController and have all necessary properties setup', function () {
    expect(NewInterviewController).toBeDefined()
    expect(NewInterviewController.cities).toBeDefined()
    expect(NewInterviewController.purposes).toBeDefined()
  })

  it('should generate unique interviewId when generate is clicked', function () {
    expect(scope.vm.data.interviewId).toBeUndefined()
    scope.vm.generateId()
    expect(scope.vm.data.interviewId).toBeDefined()
    expect(scope.vm.data.interviewId).toEqual(interviewId)
  })

  it('should display error toastr when saving of data fails', function () {
    scope.vm.create()
    deferred.reject(new Error('Error saving data'))
    scope.$digest()
    expect(toastr.error).toHaveBeenCalled()
  })

  it('should display success toastr and reset form when saving of data succeeds', function () {
    scope.vm.create(form)
    deferred.resolve()
    scope.$digest()
    expect(toastr.success).toHaveBeenCalled()
    expect(form.$setPristine).toHaveBeenCalledWith(true)
  })
})
