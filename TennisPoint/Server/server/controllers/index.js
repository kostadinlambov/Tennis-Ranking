const home = require('./home-controller')
const users = require('./users-controller')
const players = require('./players-controler')
const tournaments = require('./tournament-controller')
const categories = require('./category-controller')

module.exports = {
  home: home,
  users: users,
  players: players,
  tournaments: tournaments,
  categories: categories
}
