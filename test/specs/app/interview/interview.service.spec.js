describe('Service: Interview', function () {
  'use strict'
  beforeEach(module('App'))
  var Interview
  var deferredGetItem
  var defferedSetItem
  var $localForage
  var $timeout

  beforeEach(inject(function (_Interview_, $q, _$localForage_, _$timeout_) {
    Interview = _Interview_
    deferredGetItem = $q.defer()
    defferedSetItem = $q.defer()

    $localForage = _$localForage_
    $timeout = _$timeout_

    spyOn($localForage, 'getItem').and.callFake(function () {
      return deferredGetItem.promise
    })
    spyOn($localForage, 'setItem').and.callFake(function () {
      return defferedSetItem.promise
    })
    spyOn(Interview, 'generateId').and.callThrough()
    spyOn(Interview, 'processInterView').and.callThrough()
  }))

  describe('Interview creation test', function () {
    it('Interview service should be defined', function () {
      expect(Interview).toBeDefined()
    })
  })

  describe('Interview.generateId tests', function () {
    it('should return random generatedId in the right format', function () {
      var generatedId = Interview.generateId()
      expect(generatedId).toBeDefined()
      expect(typeof generatedId).toBe('string')
      expect(generatedId.length).toBe(14)
      expect(generatedId.charAt(0)).toBe('#')
    })
  })

  describe('Interview.processInterView tests', function () {
    var interview = {interviewId: '#1234567890DFG'}
    var interviews = [{interviewId: '#1234JH7890DCL'}, {interviewId: '#123KLBCDWE145'}]
    it('should simply return interviewId of interview if it is actually unique amongst other interviews', function () {
      var uniqueId = Interview.processInterView(interviews, interview)
      expect(uniqueId).toBeDefined()
      expect(uniqueId).toBe(interview.interviewId)
    })
    it('should generate another unique interviewId if interviewId is not unique amongst other interviews', function () {
      interviews.push(interview)
      var uniqueId = Interview.processInterView(interviews, interview)
      expect(Interview.generateId).toHaveBeenCalled()
      expect(uniqueId).toBeDefined()
      expect(uniqueId).not.toBe(interview.interviewId)
    })
  })
  describe('Interview.getAll tests', function () {
    it('should resolve with data from localforage when resolved', function () {
      var resolveWith = []
      var result
      Interview.getAll()
      .then(function (data) {
        result = data
      })
      deferredGetItem.resolve(resolveWith)
      $timeout.flush()
      expect(resolveWith).toBe(result)
    })
    it('should resolve with an empty array when localforage rejects', function () {
      var result
      Interview.getAll()
      .then(function (data) {
        result = data
      })
      deferredGetItem.reject(new Error('error saving data'))
      $timeout.flush()
      expect(result).toBeDefined()
      expect(result.constructor === Array)
      expect(result.length).toBe(0)
    })
  })
  describe('Interview.save tests', function () {
    it('should resolve with data from returned from localforage if data saves successfully', function () {
      var interview = {interviewId: '#1234567890DFG'}
      var data = []
      var resolveWith = {}
      var result
      Interview.save(interview)
      .then(function (res) {
        result = res
      })
      deferredGetItem.resolve(data)
      defferedSetItem.resolve(resolveWith)
      $timeout.flush()
      expect(Interview.processInterView).toHaveBeenCalledWith(data, interview)
      expect(data).toContain(interview)
      expect($localForage.setItem).toHaveBeenCalledWith(jasmine.any(String), data)
      expect(resolveWith).toBe(result)
    })
    it('should reject with error if data fails to save on local forage', function () {
      var interview = {interviewId: '#1234567890DFG'}
      var data = []
      var rejectWith = {}
      var result
      var error
      Interview.save(interview)
      .then(function (res) {
        result = res
      })
     .catch(function (err) {
       error = err
     })
      deferredGetItem.resolve(data)
      defferedSetItem.reject(rejectWith)
      $timeout.flush()
      expect(result).toBeUndefined()
      expect(error).toBeDefined()
    })
  })
})
