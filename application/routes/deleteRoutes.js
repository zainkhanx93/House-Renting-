const express = require("express");
const db = require("../model/database.js");
const async = require("async");
const router = express.Router();

router.post("/deleteUser", (req, res) => {
  var { body } = req;
  var { uid } = body;

  let checkUser = `SELECT * FROM User WHERE uid = ${uid};`;
  let deleteUser = `DELETE FROM User WHERE uid = ${uid};`;

  db.execute(checkUser, (err, user) => {
    if (err) console.log(err);
    if (user.length < 1) res.send("User does not exist");
    else {
      db.execute(deleteUser, (err, result) => {
        if (err) console.log(err);
        else {
          res.send("User deleted");
        }
      });
    }
  });
});

router.post("/deleteAccount", (req, res) => {
  var { body } = req;
  var { aid } = body;

  let checkAccount = `SELECT * FROM Account WHERE aid = ${aid};`;
  let deleteAccount = `DELETE FROM Account WHERE aid = ${aid};`;

  db.execute(checkAccount, (err, account) => {
    if (err) console.log(err);
    if (account.length < 1) res.send("Account does not exist");
    else {
      db.execute(deleteAccount, (err, result) => {
        if (err) console.log(err);
        else {
          res.send("Account deleted");
        }
      });
    }
  });
});

router.post("/deleteRentee", (req, res) => {
  var { query } = req;
  var { renteeId } = query;

  let checkRentee = `SELECT * FROM Rentee WHERE renteeId = ${renteeId};`;
  let deleteRentee = `DELETE FROM Rentee WHERE renteeId = ${renteeId};`;

  db.execute(checkRentee, (err, rentee) => {
    if (err) console.log(err);
    if (rentee.length < 1) res.send("Rentee does not exist");
    else {
      db.execute(deleteRentee, (err, result) => {
        if (err) console.log(err);
        else {
          res.send("Rentee deleted");
        }
      });
    }
  });
});

router.post("/deleteRenter", (req, res) => {
  var { body } = req;
  var { renterId } = body;

  let checkRenter = `SELECT * FROM Renter WHERE renterId = ${renterId};`;
  let deleteRenter = `DELETE FROM Renter WHERE renterId = ${renterId};`;

  db.execute(checkRenter, (err, renter) => {
    if (err) console.log(err);
    if (renter.length < 1) res.send("Renter does not exist");
    else {
      db.execute(deleteRenter, (err, result) => {
        if (err) console.log(err);
        else {
          res.send("Renter deleted");
        }
      });
    }
  });
});

router.post("/deleteListing", (req, res) => {
  var { body } = req;
  var { lid } = body;

  let checkListing = `SELECT * FROM Listing WHERE lid = ${lid};`;
  let deleteListing = `DELETE FROM Listing WHERE lid = ${lid};`;

  db.execute(checkListing, (err, listing) => {
    if (err) console.log(err);
    if (listing.length < 1) res.send("Listing does not exist");
    else {
      db.execute(deleteListing, (err, result) => {
        if (err) console.log(err);
        else {
          res.send("Listing deleted");
        }
      });
    }
  });
});

router.post("/deleteBooking", (req, res) => {
  var { body } = req;
  var { bid } = body;

  let checkBooking = `SELECT * FROM Booking WHERE uid = ${bid};`;
  let deleteBooking = `DELETE FROM Booking WHERE uid = ${bid};`;

  db.execute(checkBooking, (err, booking) => {
    if (err) console.log(err);
    if (booking.length < 1) res.send("Booking does not exist");
    else {
      db.execute(deleteBooking, (err, result) => {
        if (err) console.log(err);
        else {
          res.send("Booking deleted");
        }
      });
    }
  });
});

module.exports = router;
