import User from '../models/user';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
// import Cookies from 'universal-cookie';

function getJWT(user) {
  return jwt.sign({
    id: user.cuid,
    email: user.email,
  }, config.secret, {
    expiresIn: 86400, // 24 hours
  }
  );
}

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
export function getUsers(req, res) {
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      console.log(err); // eslint-disable-line
      res.status(500).send(err);
    }
    res.json({ users });
  });
}

/**
 * Save a user
 * @param req
 * @param res
 * @returns void
 */
export function addUser(req, res) {
  if (!req.body.user.email || !req.body.user.password) {
    res.status(403).end();
  } else {
    const newUser = new User(req.body.user);

    newUser.email = sanitizeHtml(newUser.email);
    newUser.cuid = cuid();
    newUser.activated = false;

    // TODO: check for existing email
    // TODO: validate email

    // newUser.password = bcrypt.hashSync(newUser.password, 10); // Bad, want async so it doesn't block requests until finished?
    bcrypt.hash(newUser.password, 10, (err, hash) => {
      if (err) {
        console.log(err); // eslint-disable-line
        res.status(500).send('Problem signing user up');
      } else {
        newUser.password = hash;

        newUser.save((saveErr, saved) => {
          if (saveErr) {
            console.log(saveErr); // eslint-disable-line
            res.status(500).send(saveErr);
          } else {
            res.status(201).send(`User '${saved.email}' has been successfully created`);
          }
        });
      }
    });
  }
}

/**
 * Update a user
 * @param req
 * @param res
 * @returns void
 */
export function updateUser(req, res) {
  if (!req.body.user.cuid || !req.body.user.email) {
    res.status(403).end();
  } else {
    const newUser = {
      activated: req.body.user.activated,
      email: req.body.user.email,
      cuid: req.body.user.cuid,
      dateAdded: req.body.user.dateAdded,
    };

    // TODO: check for existing email (ignore if cuid is same as updated user)
    // TODO: Check if password is changed and if so change it

    // Setup query
    const query = { cuid: newUser.cuid };

    // Let's sanitize inputs
    newUser.email = sanitizeHtml(newUser.email);

    // Remove _id field so Mongo doesn't cry
    delete newUser._id;

    User.findOneAndUpdate(query, newUser, { upsert: true }, (err, updated) => {
      if (err) {
        console.log(err); // eslint-disable-line
        res.status(500).send(err);
      } else {
        res.json({ user: updated });
      }
    });
  }
}

/**
 * Get a single user
 * @param req
 * @param res
 * @returns void
 */
export function getUser(req, res) {
  User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err) {
      console.log(err); // eslint-disable-line
      res.status(500).send(err);
    }
    res.json({ user });
  });
}

/**
 * Delete a user
 * @param req
 * @param res
 * @returns void
 */
export function deleteUser(req, res) {
  User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err) {
      console.log(err); // eslint-disable-line
      res.status(500).send(err);
    }

    user.remove(() => {
      res.status(200).end();
    });
  });
}

/**
 * Sign in as a user
 * @param req
 * @param res
 * @returns void
 */
export function signIn(req, res) {
  if (!req.body.user.email || !req.body.user.password) {
    res.status(403).end();
  } else {
    const newUser = {
      email: req.body.user.email,
      password: req.body.user.password,
    };

    // Let's sanitize inputs
    newUser.email = sanitizeHtml(newUser.email);

    // Remove _id field so Mongo doesn't cry
    delete newUser._id;

    // Setup query
    const query = { email: newUser.email };

    User.findOne(query).exec((err, user) => {
      if (err) {
        console.log(err); // eslint-disable-line
        res.status(500).send(err);
      } else {
        if (user) {
          // if (bcrypt.compareSync(newUser.password, user.password))
          bcrypt.compare(newUser.password, user.password, (compareErr, compareRes) => {
            if (compareErr) {
              console.log(compareErr); // eslint-disable-line
              res.status(500).send(err);
            } else {
              if (compareRes) {
                // Send JSON token to use
                const token = getJWT(user);
                // const cookies = new Cookies();
                // cookies.set('jwt', token, { path: '/' });
                // console.log(token);
                // res.cookie('jwt', token, { maxAge: 86400000 });
                res.cookie('jwt', token, { expire: 86400000 + Date.now() });
                res.status(200).json({ token });
              } else {
                // Send invalid credentials error message
                res.status(401).json({ auth: false });
              }
            }
          });
        } else {
          res.status(401).json({ auth: false });
        }
      }
    });
  }
}

/**
 * Sign a user out
 * @param req
 * @param res
 * @returns void
 */
export function signOut(req, res) {
  // res.status(200).cookie('jwt', '', { expires: 0 }).redirect('/signin');
  res.clearCookie('jwt');
  res.status(200).redirect('/signin');
}
