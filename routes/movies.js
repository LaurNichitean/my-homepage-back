var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/*
 * GET movielist.
 */
router.get('/movieList', function (req, res) {
  var db = req.db;
  db.collection('movieList').find().toArray(function (err, results) {
    res.json(results);
  });
});

/*
 * POST to addmovie.
 */
router.post('/addMovie', function (req, res) {
  console.dir(req.body);
  var db = req.db;
  db.collection('movieList').insert(req.body, function (err, result) {
    res.send(
      (err === null) ? {msg: ''} : {msg: 'Error adding movie: ' + err}
    )
  })
});

/*
 * PUT to modifymovie.
 */
router.put('/modifyMovie/:id', function (req, res) {
  var db = req.db;
  db.collection('movieList').update({'_id': ObjectId(req.params.id)},
    {$set: req.body},
    function (err, result) {
      res.send(
        (err === null) ? {msg: ''} : {msg: 'Error updating movie: ' + err}
      )
    })
});

/*
 * DELETE to deletemovie.
 */
router.delete('/deleteMovie/:id', function (req, res) {
  var db = req.db;
  db.collection('movieList').remove({'_id': ObjectId(req.params.id)},
    function (err, result) {
      res.send(
        (err === null) ? {msg: ''} : {msg: 'Error deleting movie: ' + err}
      )
    })
});

module.exports = router;
