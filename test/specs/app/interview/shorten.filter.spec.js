describe('Filter: shorten', function () {
  'use strict'
  beforeEach(module('App'))
  var shorten

  beforeEach(inject(function ($filter) {
    shorten = $filter('shorten')
  }))

  it('should return empty string for empty string', function () {
    var result = shorten('')
    expect(result).toBe('')
  })
  it('should return the string if it is less than 12 chars', function () {
    var str = 'Chima Obi'
    var result = shorten(str)
    expect(result).toBe(str)
  })

  it('should split a string by white chars, return 1st word and uppercase of 2nd word if string greater than 12 chars', function () {
    var str = 'Chimaroke Nnamani'
    var expectedResult = 'Chimaroke N.'
    var result = shorten(str)
    expect(result).toBe(expectedResult)
  })
})
