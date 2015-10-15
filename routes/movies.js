var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/*
 * GET movieList.
 */
router.get('/', function (req, res) {
  var db = req.db;
  db.collection('movieList').find().toArray(function (err, results) {
    res.json(results);
  });
});
router.get('/:id',function(req,res){
  var db = req.db;
  db.collection("movieList").findOne({'_id': ObjectId(req.params.id)},function(err,results){

      res.json(results)
    });
  });


/*
 * POST to addMovie.
 */
router.post('/', function (req, res) {
  var db = req.db;
  db.collection('movieList').insert(req.body, function (err, result) {
    res.send(
      (err === null) ? {msg: ''} : {msg: 'Error adding movie: ' + err}
    )
  })
});

/*
 * PUT to modifyMovie.
 */
router.put('/:id', function (req, res) {
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
 * DELETE to deleteMovie.
 */
router.delete('/:id', function (req, res) {
  var db = req.db;
  db.collection('movieList').remove({'_id': ObjectId(req.params.id)},
    function (err, result) {
      res.send(
        (err === null) ? {msg: ''} : {msg: 'Error deleting movie: ' + err}
      )
    })
});

module.exports = router;
