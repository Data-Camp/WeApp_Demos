const Redux = require('../libs/redux.js')
const combineReducers = Redux.combineReducers
const todos = require('./todos.js')
const visibilityFilter = require('./visibilityFilter.js')

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

module.exports = todoApp