const express = require("express");
const db = require("../model/database.js");
const async = require("async");
const router = express.Router();

router.post("/updateListingOneToOne", (req, res) => {
  var { body } = req;
  var { lid, pool, parking } = body;

  var updateListingOneToOne = `UPDATE Listing L, Amenities A SET A.pool = ${pool}, A.parking = ${parking} WHERE L.lid = ${lid} AND L.lid = A.lid;`;
  db.execute(updateListingOneToOne, (err, result) => {
    if (err) console.log(err);
    res.send("Success");
  });
});

router.post("/updateListingOneToMany", (req, res) => {
  var { body } = req;
  var { name, email, username } = body;

  var updateListingOneToMany = `UPDATE User U, Account A SET U.email = '${email}', A.username = '${username}' WHERE U.name = '${name}' AND U.uid = A.uid;`;
  db.execute(updateListingOneToMany, (err, result) => {
    if (err) console.log(err);
    res.send("Success");
  });
});

router.post("/updateListingManyToMany", (req, res) => {
  var { body } = req;
  var { startdate, noofguests, renteeId } = body;

  var updateListingManyToMany = `UPDATE Rentee_Booking R, Booking B SET B.startdate = '${startdate}', B.noofguests = ${noofguests} WHERE R.renteeId = ${renteeId};`;
  db.execute(updateListingManyToMany, (err, result) => {
    if (err) console.log(err);
    res.send("Success");
  });
});

router.post("/updateListingManyToOne", (req, res) => {
  var { body } = req;
  var { noofguests, lid } = body;

  var updateListingManyToOne = `UPDATE Listing L, Booking B SET B.noofguests = ${noofguests} WHERE L.lid = ${lid} AND L.lid = B.lid;`;
  db.execute(updateListingManyToOne, (err, result) => {
    if (err) console.log(err);
    res.send("Success");
  });
});

router.get("/userNames", (req, res) => {
  db.execute(`SELECT DISTINCT name FROM Listing`, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

module.exports = router;
