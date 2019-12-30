const RatingControl = require('../controllers/ratingControl');

module.exports = (app, auth) => {
  app.use('/api/ratings', auth.authenticate());
  // Bisogna aggiungere controlli nei due metodi
  app.put('/api/ratings', RatingControl.createTable);
  app.post('/api/ratings', RatingControl.getTable);
};
