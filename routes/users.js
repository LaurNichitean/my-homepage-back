var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/*
 * GET userList.
 */
router.get('/userList', function (req, res) {
  var db = req.db;
  db.collection('userList').find().toArray(function (err, results) {
    res.json(results);
  });
});

/*
 * POST to addUser.
 */
router.post('/addUser', function (req, res) {
  console.dir(req.body);
  var db = req.db;
  db.collection('userList').insert(req.body, function (err, result) {
    res.send(
      (err === null) ? {msg: ''} : {msg: 'Error adding user: ' + err}
    )
  })
});

/*
 * PUT to modifyUser.
 */
router.put('/modifyUser/:id', function (req, res) {
  var db = req.db;
  db.collection('userList').update({'_id': ObjectId(req.params.id)},
    {$set: req.body},
    function (err, result) {
      res.send(
        (err === null) ? {msg: ''} : {msg: 'Error updating user: ' + err}
      )
    })
});

/*
 * DELETE to deleteUser.
 */
router.delete('/deleteUser/:id', function (req, res) {
  var db = req.db;
  db.collection('userList').remove({'_id': ObjectId(req.params.id)},
    function (err, result) {
      res.send(
        (err === null) ? {msg: ''} : {msg: 'Error deleting user: ' + err}
      )
    })
});

module.exports = router;
