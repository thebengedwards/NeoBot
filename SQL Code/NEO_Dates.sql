-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 03, 2020 at 04:00 PM
-- Server version: 5.5.58-0+deb7u1-log
-- PHP Version: 5.6.31-1~dotdeb+7.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `unn_w17004394`
--

-- --------------------------------------------------------

--
-- Table structure for table `NEO_Dates`
--

CREATE TABLE IF NOT EXISTS `NEO_Dates` (
`eventID` int(64) NOT NULL,
  `eventType` varchar(64) NOT NULL,
  `ID` varchar(64) NOT NULL,
  `fName` varchar(64) NOT NULL,
  `lName` varchar(64) NOT NULL,
  `cron` varchar(64) NOT NULL,
  `gender` varchar(64) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `NEO_Dates`
--

INSERT INTO `NEO_Dates` (`eventID`, `eventType`, `ID`, `fName`, `lName`, `cron`, `gender`) VALUES
(1, 'Birthday', '271758756595892236', 'Alex', 'Booth', '00 00 08 03 04 *', 'him'),
(2, 'Birthday', '348126167062151180', 'Alex', 'Howarth', '00 00 08 01 03 *', 'him'),
(3, 'Birthday', '215951713717190656', 'Alex', 'Tankard', '00 00 08 05 06 *', 'him'),
(4, 'Birthday', '271719405384105986', 'Ben', 'Edwards', '00 00 08 14 01 *', 'him'),
(5, 'Birthday', '272090190657486848', 'Dylan', 'Custance', '00 00 08 09 06 *', 'him'),
(6, 'Birthday', '272104323729588225', 'Ed', 'Butler', '00 00 08 12 06 *', 'him'),
(7, 'Birthday', '286255321264029697', 'Fin', 'Edward', '00 00 08 28 05 *', 'him'),
(8, 'Birthday', '393047942526926850', 'Gen', 'Myhan', '00 00 08 07 01 *', 'her'),
(9, 'Birthday', '271744164377526274', 'Jamie', 'Stevens', '00 00 08 10 05 *', 'him'),
(10, 'Birthday', '385480935900184579', 'Max', 'Dalton', '00 00 08 23 08 *', 'him'),
(11, 'Birthday', '277488461844578304', 'Milan', 'Jakir', '00 00 08 07 10 *', 'him'),
(12, 'Birthday', '283292935552761857', 'Ollie', 'Morrill', '00 00 08 16 03 *', 'him'),
(13, 'Birthday', '377971556959256577', 'Sam', 'Farquhar', '00 00 08 26 05 *', 'him'),
(14, 'Calendar', 'null', 'null', 'Christmas', '00 00 08 25 11 *', 'null'),
(15, 'Calendar', 'null', 'null', 'Halloween', '00 00 08 31 09 *', 'null'),
(16, 'Calendar', 'null', 'null', 'New Year', '00 01 00 01 00 *', 'null'),
(17, 'WeeklyMeme', 'null', 'null', 'Weekly Meme', '00 00 20 * * 5', 'null');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `NEO_Dates`
--
ALTER TABLE `NEO_Dates`
 ADD PRIMARY KEY (`eventID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `NEO_Dates`
--
ALTER TABLE `NEO_Dates`
MODIFY `eventID` int(64) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
