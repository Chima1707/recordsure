(function () {
  'use strict'

  angular
    .module('App')
    .directive('purpose', purpose)
  purpose.$inject = ['$parse']
  function purpose ($parse) {
    return {
      restrict: 'A',
      scope: {
        text: '@text'
      },
      link: function (scope, element, attr) {
        var text = scope.text
        element.text(text)
        if (text.toLowerCase() === 'visa') {
          element.addClass('label label-visa')
        } else if (text.toLowerCase() === 'permanent residence') {
          element.addClass('label label-permanent')
        }
      }

    }
  };
})()
