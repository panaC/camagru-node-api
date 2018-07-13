/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   root.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: pleroux <pleroux@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/07/13 16:45:11 by pleroux           #+#    #+#             */
/*   Updated: 2018/07/13 16:50:05 by pleroux          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello! The API is at : https://' + req.headers.host + '/api');
});

module.exports = router;
