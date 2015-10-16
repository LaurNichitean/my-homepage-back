var express = require('express');
var passport = require('passport');
var Account = require('../routes/account');
var router = express.Router();

/*
 * GET userlist.

router.get('/userlist', function (req, res) {
  var db = req.db;
  db.collection('userlist').find().toArray(function (err, results) {
    res.json(results);
  });
});

/*
 * POST to addUser.

router.post('/addUser', function (req, res) {
  var db = req.db;
  db.collection('userlist').insert(req.body, function (err, result) {
    res.send(
      (err === null) ? {msg: ''} : {msg: 'Error adding user: ' + err}
    )
  })
});

/*
 * PUT to modifyUser.

router.put('/modifyUser/:id', function (req, res) {
  var db = req.db;
  db.collection('userlist').update({'_id': ObjectId(req.params.id)},
    {$set: req.body},
    function (err, result) {
      res.send(
        (err === null) ? {msg: ''} : {msg: 'Error updating user: ' + err}
      )
    })
});

/*
 * DELETE to deleteUser.

router.delete('/deleteUser/:id', function (req, res) {
  var db = req.db;
  db.collection('userlist').remove({'_id': ObjectId(req.params.id)},
    function (err, result) {
      res.send(
        (err === null) ? {msg: ''} : {msg: 'Error deleting user: ' + err}
      )
    })
});



router.get('/register', function(req, res) {
  Account.find(function (err, doc) {
    res.send(doc);
  });

});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function (err, result) {
    res.send(
      (err === null) ? {msg: ''} : {msg: 'Error adding user: ' + err}
    )

    passport.authenticate('local')(req, res, function (doc) {
      res.json(doc);
    });
  });
});

router.get('/login', function(req, res) {
  Account.find(function (err, doc) {
    res.send(doc);
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.send('ok');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.send('logout');
});



module.exports = router;
*/
router.post('/register', function(req, res) {
  Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'});
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

module.exports = router;