SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `mydb`.`User` VALUES (NULL, 'John Doe', '1990-01-01 00:00:00', 'johndoe@email.com', '1111111111'),
(NULL, 'Jane Smith', '1980-02-01 00:00:00', 'janesmith@email.com', '1111111112'),
(NULL, 'Kevin Smith', '1992-02-03 00:00:10', 'kevinsmith@email.com', '1234567890');

INSERT INTO `mydb`.`Account` VALUES (NULL, 'jdoe', SHA1('johnpassword'), '1'),
(NULL, 'jsmith', SHA1('janepassword'), '2'), 
(NULL, 'ksmith', SHA1('kevinpassword'), '3');

INSERT INTO `mydb`.`Rentee` VALUES ('1', '1'), 
('2', '2'), 
('3', '3');

INSERT INTO `mydb`.`Renter` VALUES ('1', '1'), 
('2', '2'), 
('3', '3');

INSERT INTO `mydb`.`Listing` VALUES (NULL, 'San Francisco, USA', 'House', '3', '1'),
(NULL, 'Paris, France', 'House', '4', '2'),
(NULL, 'San Mateo, USA', 'Apartment', '1', '1'),
(NULL, 'New York, USA', 'House', '3', '3'),
(NULL, 'London, England', 'Studio', '0', '2'),
(NULL, 'Miami, USA', 'Studio', '0', '3'),
(NULL, 'Madrid, Spain', 'Studio', '0', '2'),
(NULL, 'Oakland, USA', 'Apartment', '1', '1'),
(NULL, 'Los Angeles, USA', 'Apartment', '2', '3');

INSERT INTO `mydb`.`Booking` VALUES (NULL, '2019-12-01 00:00:00', '2019-12-04 00:00:00', '5', '1'),
(NULL, '2020-01-01 00:00:00', '2020-01-03 00:00:00', '3', '2'),
(NULL, '2019-12-24 00:00:00', '2019-12-28 00:00:00', '1', '3');

INSERT INTO `mydb`.`Amenities` VALUES ('1', '1', '1', '1', '0'),
('2', '1', '1', '1', '1'),
('3', '0', '1', '1', '0'),
('4', '1', '1', '1', '1'),
('5', '1', '1', '1', '0'),
('6', '0', '1', '1', '0'),
('7', '0', '1', '1', '0'),
('8', '1', '0', '0', '0'),
('9', '1', '1', '1', '0');

INSERT INTO `mydb`.`Charges` VALUES ('1', '200', '100', '50'), 
('2', '400', '200', '200'), 
('3', '75', '25', '50'),
('4', '500', '250', '100'),
('5', '45', '25', '25'),
('6', '90', '50', '45'),
('7', '80', '30', '40'),
('8', '60', '25', '30'),
('9', '100', '25', '50');

INSERT INTO `mydb`.`Studio` VALUES (NULL, '5'),
(NULL, '6'),
(NULL, '7');

INSERT INTO `mydb`.`House` VALUES (NULL, '1'),
(NULL, '2'),
(NULL, '4');

INSERT INTO `mydb`.`Apartment` VALUES (NULL, '3'),
(NULL, '8'),
(NULL, '9');

INSERT INTO `mydb`.`Rentee_Booking` VALUES ('3', '1'),
('1', '2'),
('2', '3');

/* TEST 01 - Delete User */
/* This delete statement thrown error
DELETE FROM `mydb`.`User` WHERE uid = '1';
Error Code: 1451. Cannot delete or update a parent row: 
a foreign key constraint fails (`mydb`.`rentee_booking`, CONSTRAINT `RENTEE_RB_FK` FOREIGN KEY (`renteeId`) REFERENCES `rentee` (`renteeId`))
*/ 

/* TEST 02 - Delete Account */
DELETE FROM `mydb`.`Account` WHERE aid = '1';

/* TEST 03 - Delete Rentee */
/* This delete statement thrown error
DELETE FROM `mydb`.`Rentee` WHERE renteeID = '1';
Error Code: 1451. Cannot delete or update a parent row: 
a foreign key constraint fails (`mydb`.`rentee_booking`, CONSTRAINT `RENTEE_RB_FK` FOREIGN KEY (`renteeId`) REFERENCES `rentee` (`renteeId`))
*/ 

/* TEST 04 - Delete Renter */
/* This delete statement thrown error
DELETE FROM `mydb`.`Renter` WHERE renterID = '1';
Error Code: 1451. Cannot delete or update a parent row: 
a foreign key constraint fails (`mydb`.`rentee_booking`, CONSTRAINT `BOOKING_RB_FK` FOREIGN KEY (`bid`) REFERENCES `booking` (`bid`))
*/

/* TEST 05 - Delete Listing */
/* This delete statement thrown error
DELETE FROM `mydb`.`Listing` WHERE lid = '1';
Error Code: 1451. Cannot delete or update a parent row: 
a foreign key constraint fails (`mydb`.`rentee_booking`, CONSTRAINT `BOOKING_RB_FK` FOREIGN KEY (`bid`) REFERENCES `booking` (`bid`))
*/

/* TEST 06 - Delete Booking */
/* This delete statement thrown error
DELETE FROM `mydb`.`Booking` WHERE bid = '1';
Error Code: 1451. Cannot delete or update a parent row: 
a foreign key constraint fails (`mydb`.`rentee_booking`, CONSTRAINT `BOOKING_RB_FK` FOREIGN KEY (`bid`) REFERENCES `booking` (`bid`))
*/

/*TEST- 07 One SELECT query for any ONE TO ONE relationship in the model */
SELECT 
	Listing.lid AS ListingID, 
	Listing.location AS ListingLocation, 
	Charges.deposit AS ChargesDeposit 
FROM Listing
JOIN Charges 
ON Listing.lid = Charges.lid;

/* TEST- 08 One SELECT query for any ONE TO MANY relationship in the model */
SELECT 
	Listing.location AS ListingLocation,
    Renter.uid AS UserID
FROM Renter
JOIN Listing
ON Listing.renterId = Renter.renterId;

/* TEST- 09 One SELECT query for any MANY TO ONE relationship in the model */
SELECT
	Listing.rooms AS ListingRooms,
    Booking.startdate AS Startdate,
    Booking.enddate AS Enddate
FROM Booking
JOIN Listing
ON Booking.lid = Listing.lid;

/* TEST- 10  One SELECT query for any MANY TO MANY relationship in the model */
SELECT
	Rentee.renteeId AS RenteeID,
    Booking.bid AS BookingID
FROM Rentee_Booking
JOIN Rentee, Booking
WHERE 
	Rentee.renteeId = Rentee_Booking.renteeId AND
	Booking.bid = Rentee_Booking.bid;
    
/* One SELECT query for any RECURSIVE relationship in the model */

SET SQL_SAFE_UPDATES = 0;

/* TEST 11 - one to one relation update */
UPDATE Listing L, Amenities A 
SET 
	A.pool = '0',
    A.parking = '0'
WHERE 
	L.lid = '1' AND L.lid = A.lid;
    
/* TEST 12 - one to many relation update */
UPDATE User U, Account A
SET
	U.email = 'Msjanesmith@email.com',
    A.username = 'jsmithPass'
Where
	U.name = 'Jane Smith' AND U.uid = A.uid;
    
/* TEST 13 - many to many relation update */
UPDATE Rentee_Booking R, Booking B
SET
	B.startdate = '2019-12-02 0:00:00',
    B.noofguests = '4'
WHERE 
	R.renteeId = 3;
    
/* TEST 14 - many to one relation update */
UPDATE Listing L, Booking B
SET
	B.noofguests = '5'
WHERE
	L.lid = 3;



