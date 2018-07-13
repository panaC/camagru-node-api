/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   api.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: pleroux <pleroux@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/07/13 16:39:33 by pleroux           #+#    #+#             */
/*   Updated: 2018/07/13 16:51:07 by pleroux          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const os = require('os')
var express = require('express');
var router = express.Router();

router.get('/getUsername', (req, res) => {
  res.send({ username: os.userInfo().username })
});

module.exports = router;
