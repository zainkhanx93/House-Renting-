-- MySQL Script generated by MySQL Workbench
-- Tue Dec 17 13:22:01 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`User` ;

CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `uid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `dob` DATETIME NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `contactno` BIGINT(15) NOT NULL,
  PRIMARY KEY (`uid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Account` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Account` (
  `aid` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `uid` INT NOT NULL,
  PRIMARY KEY (`aid`, `uid`),
  INDEX `uid_idx` (`uid` ASC) VISIBLE,
  CONSTRAINT `ACC_USER_FK`
    FOREIGN KEY (`uid`)
    REFERENCES `mydb`.`User` (`uid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Rentee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Rentee` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Rentee` (
  `renteeId` INT NOT NULL,
  `uid` INT NOT NULL,
  PRIMARY KEY (`renteeId`, `uid`),
  INDEX `uid_idx` (`uid` ASC) VISIBLE,
  CONSTRAINT `RENTEE_USER_FK`
    FOREIGN KEY (`uid`)
    REFERENCES `mydb`.`User` (`uid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Renter`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Renter` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Renter` (
  `renterId` INT NOT NULL,
  `uid` INT NOT NULL,
  PRIMARY KEY (`renterId`, `uid`),
  INDEX `uid_idx` (`uid` ASC) VISIBLE,
  CONSTRAINT `RENTER_USER_FK`
    FOREIGN KEY (`uid`)
    REFERENCES `mydb`.`User` (`uid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Listing`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Listing` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Listing` (
  `lid` INT NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(45) NOT NULL,
  `type` VARCHAR(25) NULL,
  `rooms` INT NOT NULL,
  `renterId` INT NOT NULL,
  PRIMARY KEY (`lid`),
  INDEX `renterId_idx` (`renterId` ASC) VISIBLE,
  CONSTRAINT `LISTING_RENTER_FK`
    FOREIGN KEY (`renterId`)
    REFERENCES `mydb`.`Renter` (`renterId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Booking`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Booking` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Booking` (
  `bid` INT NOT NULL AUTO_INCREMENT,
  `startdate` DATETIME NOT NULL,
  `enddate` DATETIME NOT NULL,
  `noofguests` INT NOT NULL,
  `lid` INT NOT NULL,
  PRIMARY KEY (`bid`),
  INDEX `lid_idx` (`lid` ASC) VISIBLE,
  CONSTRAINT `LISTING_BOOKING_FK`
    FOREIGN KEY (`lid`)
    REFERENCES `mydb`.`Listing` (`lid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Amenities`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Amenities` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Amenities` (
  `lid` INT NOT NULL,
  `parking` TINYINT(1) NULL DEFAULT 0,
  `wifi` TINYINT(1) NULL DEFAULT 0,
  `ac` TINYINT(1) NULL DEFAULT 0,
  `pool` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`lid`),
  CONSTRAINT `LISTING_AMENITIES_FK`
    FOREIGN KEY (`lid`)
    REFERENCES `mydb`.`Listing` (`lid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Charges`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Charges` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Charges` (
  `lid` INT NOT NULL,
  `perday` INT NOT NULL,
  `deposit` INT NULL DEFAULT 0,
  `cleaning` INT NULL DEFAULT 0,
  PRIMARY KEY (`lid`),
  CONSTRAINT `LISTING_CHARGES_FK`
    FOREIGN KEY (`lid`)
    REFERENCES `mydb`.`Listing` (`lid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Studio`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Studio` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Studio` (
  `sid` INT NOT NULL AUTO_INCREMENT,
  `lid` INT NOT NULL,
  PRIMARY KEY (`sid`, `lid`),
  INDEX `lid_idx` (`lid` ASC) VISIBLE,
  CONSTRAINT `LISTING_STUDIO_FK`
    FOREIGN KEY (`lid`)
    REFERENCES `mydb`.`Listing` (`lid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`House`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`House` ;

CREATE TABLE IF NOT EXISTS `mydb`.`House` (
  `hid` INT NOT NULL AUTO_INCREMENT,
  `lid` INT NOT NULL,
  PRIMARY KEY (`hid`, `lid`),
  INDEX `lid_idx` (`lid` ASC) VISIBLE,
  CONSTRAINT `LISTING_HOUSE_FK`
    FOREIGN KEY (`lid`)
    REFERENCES `mydb`.`Listing` (`lid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Apartment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Apartment` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Apartment` (
  `aid` INT NOT NULL AUTO_INCREMENT,
  `lid` INT NOT NULL,
  PRIMARY KEY (`aid`, `lid`),
  INDEX `lid_idx` (`lid` ASC) VISIBLE,
  CONSTRAINT `LISTING_APARTMENT_FK`
    FOREIGN KEY (`lid`)
    REFERENCES `mydb`.`Listing` (`lid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Rentee_Booking`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Rentee_Booking` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Rentee_Booking` (
  `renteeId` INT NOT NULL,
  `bid` INT NOT NULL,
  PRIMARY KEY (`renteeId`, `bid`),
  INDEX `BOOKING_RB_FK_idx` (`bid` ASC) VISIBLE,
  CONSTRAINT `RENTEE_RB_FK`
    FOREIGN KEY (`renteeId`)
    REFERENCES `mydb`.`Rentee` (`renteeId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `BOOKING_RB_FK`
    FOREIGN KEY (`bid`)
    REFERENCES `mydb`.`Booking` (`bid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
