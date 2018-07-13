/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   db.js                                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: pleroux <pleroux@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/07/13 11:08:12 by pleroux           #+#    #+#             */
/*   Updated: 2018/07/13 13:00:15 by pleroux          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url + '/' + dbName,  { useNewUrlParser: true },
  function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    createValidated(db, function() {
      db.collection('contacts').insertMany([{phone:"09876543", email: "pl@lp.c", status:"Unknown"}, {phone:"123455", email: "lo@lp.c"}], function(err, r) {
        assert.equal(null, err);
        assert.equal(2, r.insertedCount);

        client.close();
      });
    })
  }
);

function createValidated(db, callback) {
  db.createCollection("contacts",
	   {
	      'validator': { '$or':
	         [
	            { 'phone': { '$type': "string" } },
	            { 'email': { '$regex': /@mongodb\.com$/ } },
	            { 'status': { '$in': [ "Unknown", "Incomplete" ] } }
	         ]
	      }
	   },
    function(err, results) {
      console.log("Collection created.");
      callback();
    }
  );
};
