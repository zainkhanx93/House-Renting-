const express = require("express");
const db = require("../model/database.js");
const async = require("async");
const router = express.Router();

router.post("/user", (req, res) => {
  var { body } = req;
  var { name, dob, email, contactno } = body;

  //   console.log(name);
  //   console.log(dob);
  //   console.log(email);

  // Check if user with given email already exists
  // if so, send error, if not, insert into user, renter, rentee table
  var checkEmailQuery = `SELECT * FROM User WHERE email = '${email}'`;
  db.execute(checkEmailQuery, (err, user) => {
    if (err) console.log(err);
    if (user.length > 0) res.send("Email already used to make User");
    else {
      var insertUserQuery = `INSERT INTO User (name, email, dob, contactno) VALUES ( "${name}", "${email}", "${dob}", ${contactno});`;

      //console.log(insertUserQuery);

      db.execute(insertUserQuery, (err, result) => {
        if (err) console.log(err);
        else {
          var insertRenteeQuery = `INSERT INTO Rentee (renteeId, uid) VALUES ( ${result.insertId}, ${result.insertId});`;
          var insertRenterQuery = `INSERT INTO Renter (renterId, uid) VALUES ( ${result.insertId}, ${result.insertId});`;

          async.parallel(
            [
              function(parallel_done) {
                db.execute(insertRenteeQuery, (err, result) => {
                  if (err) return parallel_done(err);
                  parallel_done();
                });
              },
              function(parallel_done) {
                db.execute(insertRenterQuery, (err, result) => {
                  if (err) return parallel_done(err);
                  parallel_done();
                });
              }
            ],
            function(err) {
              if (err){
                console.log(err);
                res.send(err);
              }
              else
              res.send("User with id "+result.insertId +" is inserted successfully ");
            }
          );
        }
      });
    }
  });
});

router.post("/account", (req, res) => {
  var { body } = req;
  var { username, password, uid } = body;

  //   console.log(username);
  //   console.log(password);
  //   console.log(uid);

  var checkUidQuery = `SELECT * FROM User WHERE uid = ${uid};`;

  var checkUsernameQuery = `SELECT * FROM Account WHERE username = '${username}' OR uid = ${uid};`;
  var insertAccountQuery = `INSERT INTO Account (username, password, uid) VALUES ( '${username}', SHA1('${password}'), ${uid});`;

  // check if user exists, continue if true
  // then check if account exists with given username or uid, continue if false
  // insert account
  db.execute(checkUidQuery, (err, user) => {
    if (err) console.log(err);
    if (user.length != 1) res.send("UserId does not exist");
    else {
      db.execute(checkUsernameQuery, (err, account) => {
        if (err) console.log(err);
        if (account.length > 0)
          res.send("Username taken or Account with uid already exists");
        else {
          db.execute(insertAccountQuery, (err, result) => {
            if (err) console.log(err);
            res.send( res.send("Account with id "+result.insertId +" is inserted successfully "));

          });
        }
      });
    }
  });
});

router.post("/listing", (req, res) => {
  var { body } = req;
  var {
    location,
    type,
    rooms,
    renterId,
    parking,
    wifi,
    ac,
    pool,
    perday,
    deposit,
    cleaning
  } = body;

  var checkRenterIdQuery = `SELECT * FROM Renter WHERE renterId = ${renterId};`;
  var insertListingQuery = `INSERT INTO Listing (location, type, rooms, renterId) VALUES ( '${location}', '${type}', ${rooms}, ${renterId});`;

  // check if renter (listing owner) exists, if true continue
  // insert into listing, charges, amenities, and house/apartment/studio tables
  db.execute(checkRenterIdQuery, (err, renter) => {
    if (err) console.log(err);
    if (renter.length < 1) res.send("Renter does not exist");
    else {
      db.execute(insertListingQuery, (err, result) => {
        if (err) console.log(err);
        else {
          var insertChargesQuery = `INSERT INTO Charges (lid, perday, deposit, cleaning) VALUES ( ${result.insertId}, ${perday}, ${deposit}, ${cleaning});`;
          var insertAmenitiesQuery = `INSERT INTO Amenities (lid, parking, wifi, ac, pool) VALUES ( ${result.insertId}, ${parking}, ${wifi}, ${ac}, ${pool});`;
          var insertTypeQuery = `INSERT INTO ${type} (lid) VALUES (${result.insertId});`;

          async.parallel(
            [
              function(parallel_done) {
                db.execute(insertChargesQuery, (err, result) => {
                  if (err) return parallel_done(err);
                  parallel_done();
                });
              },
              function(parallel_done) {
                db.execute(insertAmenitiesQuery, (err, result) => {
                  if (err) return parallel_done(err);
                  parallel_done();
                });
              },
              function(parallel_done) {
                db.execute(insertTypeQuery, (err, result) => {
                  if (err) return parallel_done(err);
                  parallel_done();
                });
              }
            ],
            function(err) {
              if (err) console.log(err);
              res.send("Listing with id "+result.insertId +" is inserted successfully ");
            }
          );
        }
      });
    }
  });
});

router.post("/booking", (req, res) => {
  var { body } = req;
  var { renteeId, startdate, enddate, noofguests, lid } = body;

  var checkRenteeIdQuery = `SELECT * FROM Rentee WHERE renteeId = ${renteeId};`;
  var checkLidQuery = `SELECT * FROM listing WHERE lid = ${lid};`;
  var insertBookingQuery = `INSERT INTO Booking (startdate, enddate, noofguests, lid) VALUES ( '${startdate}', '${enddate}', ${noofguests}, ${lid});`;

  // check if rentee and listing exists, if true, continue
  // insert into booking and rentee_booking tables
  async.parallel(
    [
      function(parallel_done) {
        db.execute(checkRenteeIdQuery, (err, rentee) => {
          if (err) return parallel_done(err);
          if (rentee.length < 1) res.send("Rentee does not exist");
          parallel_done();
        });
      },
      function(parallel_done) {
        db.execute(checkLidQuery, (err, listing) => {
          if (err) return parallel_done(err);
          if (listing.length < 1) res.send("Listing does not exist");
          parallel_done();
        });
      }
    ],
    function(err) {
      db.execute(insertBookingQuery, (err, result) => {
        if (err) console.log(err);
        else {
          var insertRenteeBookingQuery = `INSERT INTO Rentee_Booking (renteeId, bid) VALUES ( ${renteeId}, ${result.insertId});`;

          db.execute(insertRenteeBookingQuery, (err, result) => {
            if (err) console.log(err);
            res.send("Listing is booked successfully ");
          });
        }
      });
    }
  );
});

module.exports = router;
