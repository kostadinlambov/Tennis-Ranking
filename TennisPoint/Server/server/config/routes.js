const controllers = require('../controllers')
const auth = require('./auth')
// const cors = require('cors')

module.exports = (app) => {
  // app.get('/', controllers.home.index)
  // app.get('/about', auth.isAuthenticated, controllers.home.about)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)


  //Players
  app.post('/players/create', controllers.players.createPost)
  app.get('/players/all', controllers.players.getAll)
  app.get('/players/addTournament', controllers.players.getAddTournament)
  app.post('/players/addTournament', controllers.players.postAddTournament)
  app.get('/players/deleteTournament', controllers.players.getDeleteTournament)
  app.post('/players/deleteTournament', controllers.players.postDeleteTournament)


  //Tournaments
  app.get('/tournaments/create', controllers.tournaments.createGet)
  app.post('/tournaments/create', controllers.tournaments.createPost)
  app.get('/tournaments/all', controllers.tournaments.getAll)
  app.get('/tournaments/delete/:id', controllers.tournaments.deleteGet)
  app.post('/tournaments/delete/:id', controllers.tournaments.deletePost)
  // app.get('/tournaments/delete/5b425cf0cda1756a4466f785', controllers.tournaments.deleteGet)

  //Categories
  app.post('/categories/create', controllers.categories.createPost)
  app.get('/categories/all', controllers.categories.getAll)


  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
