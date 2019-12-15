const express = require("express");
const db = require("../model/database.js");
const async = require("async");
const router = express.Router();

router.get("/deleteUser", (req, res) => {
  var { query } = req;
  var { uid } = query;

  let checkUser = `SELECT * FROM User WHERE uid = ${uid};`;
  let deleteUser = `DELETE FROM User WHERE uid = ${uid};`;

  db.execute(checkUser, (err, user) => {
    if (err) console.log(err);
    if (user.length < 1) res.send("User does not exist");
    else {
      db.execute(deleteUser, (err, result) => {
        if (err) console.log(err);
        else {
          res.send("User with user ID - "+uid+" is deleted");
        }
      });
    }
  });
});

router.get("/deleteAccount", (req, res) => {
  var { query } = req;
  var { aid } = query;

  let checkAccount = `SELECT * FROM Account WHERE aid = ${aid};`;
  let deleteAccount = `DELETE FROM Account WHERE aid = ${aid};`;

  db.execute(checkAccount, (err, account) => {
    if (err) console.log(err);
    if (account.length < 1) res.send("Account does not exist");
    else {
      db.execute(deleteAccount, (err, result) => {
        if (err) console.log(err);
        else {
          res.send("Account with account ID - "+aid+" is deleted");
        }
      });
    }
  });
});

router.get("/deleteRentee", (req, res) => {
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
          res.send("Rentee with rentee ID -"+ renteeId +" is deleted");
        }
      });
    }
  });
});

router.get("/deleteRenter", (req, res) => {
  var { query } = req;
  var { renterId } = query;

  let checkRenter = `SELECT * FROM Renter WHERE renterId = ${renterId};`;
  let deleteRenter = `DELETE FROM Renter WHERE renterId = ${renterId};`;

  console.log(checkRenter);
  db.execute(checkRenter, (err, renter) => {
    if (err) console.log(err);
    if (renter.length < 1) res.send("Renter does not exist");
    else {
      db.execute(deleteRenter, (err, result) => {
        if (err) console.log(err);
        else {
          res.send("Renter with renter ID - "+renterId+" is deleted");
        }
      });
    }
  });
});

router.get("/deleteListing", (req, res) => {
  var { query } = req;
  var { lid } = query;

  let checkListing = `SELECT * FROM Listing WHERE lid = ${lid};`;
  let deleteListing = `DELETE FROM Listing WHERE lid = ${lid};`;

  db.execute(checkListing, (err, listing) => {
    if (err) console.log(err);
    if (listing.length < 1) res.send("Listing does not exist");
    else {
      db.execute(deleteListing, (err, result) => {
        if (err) console.log(err);
        else {
          res.send("Listing with listing ID -"+lid+" is deleted");
        }
      });
    }
  });
});

router.get("/deleteBooking", (req, res) => {
  var { query } = req;
  var { bid } = query;

  let checkBooking = `SELECT * FROM Booking WHERE uid = ${bid};`;
  let deleteBooking = `DELETE FROM Booking WHERE uid = ${bid};`;

  db.execute(checkBooking, (err, booking) => {
    if (err) console.log(err);
    if (booking.length < 1) res.send("Booking does not exist");
    else {
      db.execute(deleteBooking, (err, result) => {
        if (err) console.log(err);
        else {
          res.send("Booking with booking ID - "+bid+" is deleted");
        }
      });
    }
  });
});

/*******select ids for delete****/

router.get("/userIds", (req, res) => {
  db.execute(`SELECT DISTINCT uid FROM User ORDER BY uid`, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

router.get("/accountIds", (req, res) => {
  db.execute(`SELECT DISTINCT aid FROM Account ORDER BY aid`, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

router.get("/renterIds", (req, res) => {
  db.execute(`SELECT DISTINCT renterId FROM Renter ORDER BY renterId`, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});


router.get("/renteeIds", (req, res) => {
  db.execute(`SELECT DISTINCT renteeId FROM Rentee ORDER BY renteeId`, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

router.get("/bookingIds", (req, res) => {
  db.execute(`SELECT DISTINCT bid FROM Booking ORDER BY bid`, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});


module.exports = router;
