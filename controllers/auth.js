/**
 * Authentication Module
 *
 * @author Roberto Bruno
 * @version
 * @since
 * 2019 - Copyright by Gang Of Four Eyes
 */
// Settings e moduli
const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('./models/user');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: process.env.PRIVATE_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'), // Uso dello schema jwt (Ricordare di creare il token come JWT + token)
  session: false,
};

// Funzione da esportare
module.exports = function() {
  const strategy = new Strategy(params, (payload, done) => {
    // Funzione chiamata per controllare il token (il payload è il token già decriptato)
    console.log(payload);
    // Chiamata di controllo al db
    User.findByEmail(payload.id)
        .then((result) => {
          if (result === null) {
            return done(new Error('User not found'), null);
          }
          return done(null, {id: result.email}); // Non ho ancora capito bene a chi ritorni tale valore -- Controllare se lo ritorna alla funzione successiva, se sì potrebbe essere utile
        })
        .catch((err) => {
          return done(new Error('User not found'), null);
        });
  });

  // Aggiunti per rimuovere alcuni problemi di serializzazione (Vedere se mantenere)
  passport.serializeUser((user, done)=>{
    done(null, user);
  });

  passport.deserializeUser((user, done)=>{
    done(null, user);
  });

  // Set della strategia
  passport.use(strategy);

  // Ritorno di un oggetto avente la funzione di autenticazione e di inizializzazione
  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt', process.env.PRIVATE_KEY);
    },
  };
};
