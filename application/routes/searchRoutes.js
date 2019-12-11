const express = require("express");
const db = require("../model/database.js");
const async = require("async");
const router = express.Router();

router.get("/listingIds", (req, res) => {
  var getListingIds = `SELECT DISTINCT lid FROM listing ORDER BY lid`;
  db.execute(getListingIds, (err, listingIds) => {
    if (err) console.log(err);
    res.send(listingIds);
  });
});

router.get("/listingOneToOne", (req, res) => {
  var { query } = req;
  var { lid } = query;

  var selectListingOneToOne = `SELECT Listing.lid AS ListingID, Listing.location AS ListingLocation, Charges.deposit AS ChargesDeposit FROM Listing JOIN Charges ON Listing.lid = Charges.lid WHERE Listing.lid = ${lid};`;
  db.execute(selectListingOneToOne, (err, listing) => {
    if (err) console.log(err);
    res.send(listing);
  });
});

router.get("/listingOneToMany", (req, res) => {
  var { query } = req;
  var { lid } = query;

  var selectListingOneToMany = `SELECT Listing.location AS ListingLocation, Renter.uid AS UserID FROM REnter Join Listing ON Listing.renterId = Renter.renterId WHERE Listing.lid = ${lid};`;
  db.execute(selectListingOneToMany, (err, listing) => {
    if (err) console.log(err);
    res.send(listing);
  });
});

router.get("/listingManyToOne", (req, res) => {
  var { query } = req;
  var { lid } = query;

  var selectListingManyToOne = `SELECT Listing.rooms AS ListingRooms, Booking.startdate AS Startdate, Booking.enddate AS Enddate FROM Booking JOIN Listing ON Booking.lid = Listing.lid WHERE Listing.lid = ${lid};`;
  db.execute(selectListingManyToOne, (err, listing) => {
    if (err) console.log(err);
    res.send(listing);
  });
});

router.get("/bookingManyToMany", (req, res) => {
  var selectBookingManyToMany = `SELECT Rentee.renteeId AS RenterID, Booking.bid AS BookingID FROM Rentee_Booking JOIN Rentee, Booking WHERE Rentee.renteeId = Rentee_Booking.renteeId AND Booking.bid = Rentee_Booking.bid;`;
  db.execute(selectBookingManyToMany, (err, bookings) => {
    if (err) console.log(err);
    res.send(bookings);
  });
});

module.exports = router;
