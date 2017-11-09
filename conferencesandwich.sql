-- MySQL dump 10.15  Distrib 10.0.15-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: Sandwiches
-- ------------------------------------------------------
-- Server version	10.0.15-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `Sandwiches`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Sandwiches` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `Sandwiches`;

--
-- Table structure for table `choices`
--

DROP TABLE IF EXISTS `choices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `choices` (
  `datetime` datetime DEFAULT NULL,
  `confid` int(6) DEFAULT NULL,
  `userid` int(6) unsigned DEFAULT NULL,
  `sandid` int(6) DEFAULT NULL,
  KEY `confid` (`confid`),
  KEY `userid` (`userid`),
  KEY `sandid` (`sandid`),
  CONSTRAINT `choices_ibfk_1` FOREIGN KEY (`confid`) REFERENCES `conferences` (`id`) ON DELETE CASCADE,
  CONSTRAINT `choices_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `choices_ibfk_3` FOREIGN KEY (`sandid`) REFERENCES `sandwiches` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choices`
--

LOCK TABLES `choices` WRITE;
/*!40000 ALTER TABLE `choices` DISABLE KEYS */;
INSERT INTO `choices` VALUES ('2014-11-30 23:00:00',11,1,1),('2014-12-05 21:09:30',18,3,6);
/*!40000 ALTER TABLE `choices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conference_sandwiches`
--

DROP TABLE IF EXISTS `conference_sandwiches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conference_sandwiches` (
  `confid` int(11) DEFAULT NULL,
  `sandid` int(11) DEFAULT NULL,
  KEY `confid` (`confid`),
  KEY `sandid` (`sandid`),
  CONSTRAINT `conference_sandwiches_ibfk_1` FOREIGN KEY (`confid`) REFERENCES `conferences` (`id`),
  CONSTRAINT `conference_sandwiches_ibfk_2` FOREIGN KEY (`sandid`) REFERENCES `sandwiches` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference_sandwiches`
--

LOCK TABLES `conference_sandwiches` WRITE;
/*!40000 ALTER TABLE `conference_sandwiches` DISABLE KEYS */;
INSERT INTO `conference_sandwiches` VALUES (11,1),(18,5),(18,6),(18,1),(18,3);
/*!40000 ALTER TABLE `conference_sandwiches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conferences`
--

DROP TABLE IF EXISTS `conferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conferences` (
  `name` varchar(30) DEFAULT NULL,
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `location` varchar(40) DEFAULT NULL,
  `datetime` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conferences`
--

LOCK TABLES `conferences` WRITE;
/*!40000 ALTER TABLE `conferences` DISABLE KEYS */;
INSERT INTO `conferences` VALUES ('Red Hat Society',11,'Dallas, TX','2011-01-01'),('',12,'','0000-00-00'),('',13,'','0000-00-00'),('Poetry Dance Party',14,'Plano, TX','0000-00-00'),('FOCUS Banquet',18,'Galaxy Rooms','2015-03-07'),('UTD Hackathon',19,'ECS Lab','2015-11-09');
/*!40000 ALTER TABLE `conferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sandwiches`
--

DROP TABLE IF EXISTS `sandwiches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sandwiches` (
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `id` int(6) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sandwiches`
--

LOCK TABLES `sandwiches` WRITE;
/*!40000 ALTER TABLE `sandwiches` DISABLE KEYS */;
INSERT INTO `sandwiches` VALUES ('Bacon Lettuce Tomato','BLT Sandwich',1),('Tuna Fish Sandwich','Extra spicy tuna fish sandwich',3),('Gyro Pita Sandwich','Tzatziki sauce on lamb gyro pita bread',4),('Bacon Egg and Cheese','Scrambled egg, applewood smoked bacon, and cheese on white bread',5),('Spicy Grilled Chicken','Extra hot, char-grilled sandiwch on rye',6);
/*!40000 ALTER TABLE `sandwiches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `fname` varchar(20) DEFAULT NULL,
  `lname` varchar(35) DEFAULT NULL,
  `phash` varchar(50) NOT NULL,
  `username` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `admin` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Laurel','Mohrman','password','laurel','laurel@me.com','N'),(2,'David','Sanders','password','david','david@me.com','Y'),(3,'Typical','User','password','typical','typical@me.com','N'),(9,'Amanda','Vereen','Password8','amanda','amanda@ma.com','N'),(10,'bro','dawg','Brodawg1','brodawg','brodawg@brodawg.brodawg','N'),(12,'Derp','McFerp','What3v3r','DerpMcFerp','derpmcderp@mailinator,com','N'),(13,'Laurel','M','Password4','laurel1','laurel@me.com','N'),(14,'Davo','Sando','1Dragons','Davo','incomplete@j','N'),(15,'fxdbvgdf','sdgfsd','gsdfg87Awds','dfgsd','sadfsa@saf.xcsa','N');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-12-05 15:10:51
