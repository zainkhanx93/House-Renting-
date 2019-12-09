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
    res.send("Sucess");
  });
});

module.exports = router;
