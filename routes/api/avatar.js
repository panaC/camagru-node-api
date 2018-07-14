/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   avatar.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: pleroux <pleroux@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/07/14 12:06:50 by pleroux           #+#    #+#             */
/*   Updated: 2018/07/14 18:48:16 by pleroux          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.post('/upload/:id', (req, res) => {
  if (req.files.avatar && req.params.id) {
    req.files.avatar.mv('static/avatar/' + req.params.id, (err) => {
      if (err) res.json({success: false, message: err});
      else res.json({success: true, message: "ok"});
    });
  } else {
    res.json({success: false, message: "no avatar"});
  }
});

router.post('/:id', (req, res) => {
  if (req.params.id) {
    res.sendFile(req.params.id, {root: "static/avatar/"}, (err) => {
      if (err) {
        res.sendFile("avatar.png", {root: "static/avatar/"} ,(err) => {
          if (err) res.status(404).json({success: false, message: "no default"});
        });
      }
    });
  } else {
    res.json({success: false, message: "no id"});
  }
});

module.exports = router;
