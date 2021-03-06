var express = require('express');
var router = express.Router();
var passport = require('passport');

var db = require('../db');

/* Get a single student: req.user.username */
router.get('/students/:email', passport.authenticate('basic', { session: false }),
  function(req, res, next) {
    db.getClient().collection("students").findOne({email: req.params.email},(err,result)=>{
      if(err) res.status(500).send({error:err.message})
      if(!result) res.status(400).send({error:"This student does not exist"})
      if(result) res.send(result)
    })
});

/* Create a student account */
router.post('/students', function(req, res, next) {
  const student = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    learningTargets: req.body.learningTargets,
    location: req.body.location
  };
  db.getClient().collection("students").findOne({email: student.email},
    function(err, results) {
      if (results) {
        res.status(400).send({error: 'Student ' + student.email + ' already exists!'});
      } else {
        db.getClient().collection("students").insertOne(student, function(err, r) {
          if (err) {
            res.status(500).send(err);
          }
          else {
            res.send(student);
          }
        })
      }
    });
});

/* Update a student account */
router.put('/students/:email', passport.authenticate('basic', { session: false }),
  function(req, res, next) {
    // TODO: EXTRA CREDIT update student record
});

module.exports = router;
