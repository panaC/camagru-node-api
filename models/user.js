/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: pleroux <pleroux@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/07/13 16:55:11 by pleroux           #+#    #+#             */
/*   Updated: 2018/07/13 18:24:56 by pleroux          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    age: {type: Number, min: 10, max: 100, required: true},
    password: {type: String, required: true},
    mail: {type: mongoose.SchemaTypes.Email, required: true},
    dateCreated: {type: Date, required: true},
    biographie: String,
}));
