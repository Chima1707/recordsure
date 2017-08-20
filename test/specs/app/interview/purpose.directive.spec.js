describe('Directive: purpose', function () {
  'use strict'
  beforeEach(module('App'))
  var compile
  var scope
  var params = [{param: 'Visa', addedClass: 'label-visa'}, {param: 'Permanent residence', addedClass: 'label-permanent'}]

  function testDirective (param, addedClass) {
    var element = angular.element('<span purpose text="' + param + '"> </span>')
    compile(element)(scope)
    expect(element.text()).toBe(param)
  }

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new(true)
    compile = $compile
  }))

  params.forEach(function (item) {
    var param = item.param
    var addedClass = item.addedClass
    it('purpose directive should render for ' + param + ' properly', testDirective.bind(null, param, addedClass))
  })
})
