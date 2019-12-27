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
const jwt = require('jsonwebtoken');
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
    // Chiamata di controllo al db
    User.findByEmail(payload.id)
        .then((result) => {
          if (result === null) {
            return done(new Error('User not found'), null);
          }
          // L'oggetto viene passato alla funzione successiva
          return done(null, {
            id: result.email,
            role: result.role,
          });
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
    isLogged: (req, res, next) => {
      const token = req.get('Authorization');
      if (token !== null && jwt.verify(token.substring(4), process.env.PRIVATE_KEY)) {
        res.send({
          error: 'User is already logged.',
        });
      } else {
        next();
      }
    },
    isProfessor: (req, res, next) => {
      const role = req.user.role;
      if (check(role, User.Role.PROFESSOR)) {
        next();
      } else {
        setError(res);
      }
    },
    isStudent: (req, res, next) => {
      const role = req.user.role;
      if (check(role, User.Role.STUDENT)) {
        next();
      } else {
        setError(res);
      }
    },
    isDDI: (req, res, next) => {
      const role = req.user.role;
      if (check(role, User.Role.DDI)) {
        next();
      } else {
        setError(res);
      }
    },
    isTeachingOffice: (req, res, next) => {
      const role = req.user.role;
      if (check(role, User.Role.TEACHING_OFFICE)) {
        next();
      } else {
        setError(res);
      }
    },
  };
};

// Utilities Functions

const check = (realRole, expectedRole) => {
  return (realRole !== null && realRole === expectedRole);
};

const setError = (res) => {
  res.status(401);
  res.send({
    error: 'Access denied',
  });
};
