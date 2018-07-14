/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: pleroux <pleroux@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/07/13 17:19:08 by pleroux           #+#    #+#             */
/*   Updated: 2018/07/14 18:52:03 by pleroux          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express = require('express');
const router  = express.Router();
const User    = require('../../models/user'); // get our mongoose model

router.post('/create', (req, res) => {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        password: req.body.password,
        mail: req.body.mail,
        dateCreated: Date.now(),
        biographie: req.body.bio ? req.body.bio : ""
      });

      newUser.save((err) => {
        if (err) res.json({success: false, message: err});
        else res.json({success: true, message: "ok"});
      });
});

router.post('/modify', (req, res) => {
  if (req.body.prevMail) {
    User.findOneAndUpdate({mail: req.body.prevMail}, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      password: req.body.password,
      mail: req.body.mail,
      biographie: req.body.bio ? req.body.bio : ""
    }, (err, doc) => {
      if (err || !doc) res.json({success: false, message: err || "no match"});
      else res.json({success: true, message: "ok"});
    });
  } else {
    res.json({success: false, message: "err"});
  }
});

router.post('/get', (req, res) => {
  if (req.body.mail) {
    User.where({mail : req.body.mail}).findOne((err, doc) => {
      if (err || !doc) res.json({success: false, message: err || "no match"});
      else res.json({success: true, message: "ok", data: doc});
    });
  } else {
    res.json({success: false, message: "err"});
  }
});

router.post('/info', (req, res) => {
  if (req.body.idUser) {
    User.where({_id : req.body.idUser}).findOne((err, doc) => {
      if (err || !doc) res.json({success: false, message: err || "no match"});
      else res.json({success: true, message: "ok", name: {first: doc.firstname, last: doc.lastname}});
    });
  } else {
    res.json({success: false, message: "err"});
  }
});

router.post('/auth', (req, res) => {
  if (req.body.mail && req.body.password) {
    User.where({mail : req.body.mail}).findOne((err, doc) => {
      if (err || !doc) res.json({success: false, message: err || "wrong mail"});
      else if (req.body.password === doc.password) {
        res.json({success: true, message: "ok"});
      } else {
        res.json({success: false, message: "wrong password"});
      }
    });
  } else {
    res.json({success: false, message: "err"});
  }
});

module.exports = router;
