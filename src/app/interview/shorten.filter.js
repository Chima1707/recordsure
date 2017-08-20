(function () {
  'use strict'

  angular
    .module('App')
    .filter('shorten', shorten)

  shorten.$inject = []

  function shorten () {
    return function (text) {
      if (!text || text.length <= 12) {
        return text
      }
      var splited = text.split(/\s+/)
      if (splited.length === 1) {
        return splited[0]
      }
      var suffix = (splited[1] ? splited[1].charAt(0) : '') + '.'
      return splited[0] + ' ' + suffix.toUpperCase()
    }
  }
})()
