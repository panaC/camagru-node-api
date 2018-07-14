/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   img.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: pleroux <pleroux@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/07/14 15:51:28 by pleroux           #+#    #+#             */
/*   Updated: 2018/07/14 17:26:55 by pleroux          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Img', new Schema({
  idUser: String,
  name: {type: String, required: true},
  hash: {type: String, required: true},
  dateCreated: {type: Date, required: true},
  comment: String
}));
