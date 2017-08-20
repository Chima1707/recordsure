(function () {
  'use strict'

  angular
        .module('App')
        .service('Interview', Interview)

  Interview.$inject = ['$q', '$localForage']

/**
  * *Interview
  * *@param {Object} $q- $q service
  * *@param {Object} $localForage- service for interacting with browser storages
  */
  function Interview ($q, $localForage) {
    var alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var key = 'interviews'

    /**
    * generates a random alphanumeric string of a specific length.
    * @param {Number} len - length.
    * @returns {String} = Random string returned.
    */
    function getRandomString (len) {
      var result = ''
      for (var i = len; i > 0; --i) {
        result += alphanumeric[Math.floor(Math.random() * alphanumeric.length)]
      }
      return result
    }

    /**
    * Checks if a interview Id exists in list of interview Ids.
    * @param {Number} id - Interview Id
    * @param {Array} res - List of interview Ids.
    * @returns {Boolean} = if interview Id exists.
    */
    function idExists (id, list) {
      return list.indexOf(id) > -1
    }

    /**
    * Called to generate a random interview Id.
    * @returns {String} = Generated interview Id.
    */
    this.generateId = function () {
      return '#' + getRandomString(13)
    }
    /**
    * Processes an interview before saving it. might possibly generate another unique id if interview Id is not already exists.
    * *@param {Array} interviews - List of all interviews
    * @param {Object}  interview - interview object.
    * @returns {String} = unique interview Id.
    */
    this.processInterView = function (interviews, interview) {
      var id = interview.interviewId
      var ids = interviews.map(function (item) {
        return item.interviewId
      })
      while (idExists(id, ids)) {
        id = this.generateId()
      }
      return id
    }

    /**
    * Called to save an interview object.
    * *@param {Object} interview - List of all interviews
    * *@returns {Promise} = Promise returned.
    */
    this.save = function save (interview) {
      var self = this
      return this.getAll()
      .then(function (data) {
        var validId = self.processInterView(data, interview)
        if (validId !== interview.interviewId) {
          interview.interviewId = validId
        }
        data.unshift(interview)
        return $localForage.setItem(key, data)
      })
    }

    /**
    * Called to get all interview objects in the system.
    * @returns {Promise} = Promise returned.
    */
    this.getAll = function getAll () {
      return $localForage.getItem(key)
      .then(function (data) {
        data = data || []
        return data
      })
      .catch(function () {
        return []
      })
    }
  }
})()
