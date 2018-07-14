/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   img.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: pleroux <pleroux@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/07/14 15:29:57 by pleroux           #+#    #+#             */
/*   Updated: 2018/07/14 22:45:30 by pleroux          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express = require('express');
const router  = express.Router();
const Img = require('../../models/img'); // get our mongoose model
const crypto = require('crypto');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.post('/upload', (req, res) => {
//console.log("il passera");
//console.log(req)
console.log(req.files);;
  if (req.files.img && req.body.idUser && req.body.name) {
    const dateCreated = Date.now();
    const img = new Img({
      idUser: req.body.idUser,
      name: req.body.name,
      dateCreated: dateCreated,
      hash: crypto.createHash('md5').update(req.body.name + dateCreated).digest("hex"),
      comment: req.body.comment ? req.body.comment : ""
    });

    img.save((err) => {
      if (err) res.json({success: false, message: err});
      else {
        req.files.img.mv('static/img/' + img.hash, (err) => {
          if (err) res.json({success: false, message: err});
          else res.json({success: true, message: "ok"});
        });
      }
    });
  } else {
    res.json({success: false, message: "wrong params"});
  }
});

router.post('/count', (req, res) => {
  Img.countDocuments({}, (err, count) => {
    if (err) res.json({success: false, message: err});
    else res.json({success: true, message: "ok", count: count});
  })
});

router.post('/page/:page', (req, res) => {
  const nbImg = 6;
  const page = req.params.page;

  Img.find({})
  .sort({dateCreated: -1})
  .skip(nbImg * page - nbImg)
  .limit(nbImg)
  .exec((err, img) => {
    Img.countDocuments({}, (err, count) => {
      if (err) res.json({success: false, message: err});
      else {
        res.json({
          success: true,
          message: "ok",
          img: img,
          count: img.length,
          currentPage: req.params.page,
          page: Math.ceil(count / nbImg)
        });
      }
    })
  });
});

router.post('/get/:hash', (req, res) => {
  if (req.params.id) {
    res.sendFile(req.params.hash, {root: "static/img/"}, (err) => {
      if (err) {
        res.sendFile("default.png", {root: "static/img/"} ,(err) => {
          if (err) res.status(404).json({success: false, message: "no default"});
        });
      }
    });
  } else {
    res.json({success: false, message: "no hash"});
  }
});

module.exports = router;
