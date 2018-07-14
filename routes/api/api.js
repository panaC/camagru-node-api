/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   api.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: pleroux <pleroux@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/07/13 16:39:33 by pleroux           #+#    #+#             */
/*   Updated: 2018/07/14 15:55:37 by pleroux          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const os = require('os')
const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const avatarRouter = require('./avatar');
const imgRouter = require('./img');

router.use('/avatar', avatarRouter);
router.use('/user', userRouter);
router.use('/img', imgRouter);


router.get('/getUsername', (req, res) => {
  res.send({ username: os.userInfo().username })
});

module.exports = router;
