/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: pleroux <pleroux@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/07/13 17:19:08 by pleroux           #+#    #+#             */
/*   Updated: 2018/07/13 18:58:35 by pleroux          ###   ########.fr       */
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
  }
});

module.exports = router;
