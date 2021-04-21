-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2021 at 01:16 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `youtube-quiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `sets`
--

CREATE TABLE `sets` (
  `SetID` int(11) NOT NULL,
  `SetDescription` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sets`
--

INSERT INTO `sets` (`SetID`, `SetDescription`) VALUES
(0, 'Random songs from all categories'),
(1, '[EASY] Songs with more than 100 million plays'),
(2, '[MEDIUM] Songs between 10 and 100 million plays'),
(3, '[HARD] Songs between 1 and 10 million plays'),
(4, '[VERYHARD] Songs between 100k and 1 million plays');

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `SongID` int(11) NOT NULL,
  `SongLink` varchar(42) NOT NULL,
  `SetID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`SongID`, `SongLink`, `SetID`) VALUES
(1, 'C5i-UnuUKUI', 1),
(2, 'wK-8TCDrbV8', 2),
(3, '4U8MvhH6GnA', 4),
(4, 'dQw4w9WgXcQ', 1),
(5, 'r_0JjYUe5jo', 1),
(6, '5y3xh8gs24c', 2),
(7, 'Y-B0lXnierw', 3),
(8, '3fC0jqI3Bt', 3),
(9, 'fJ9rUzIMcZQ', 1),
(10, 'HgzGwKwLmgM', 1),
(11, 'n4RjJKxsamQ', 1),
(12, 'bysD5pKE4p8', 3),
(13, 'Acq4odTvLQs', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sets`
--
ALTER TABLE `sets`
  ADD PRIMARY KEY (`SetID`);

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`SongID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sets`
--
ALTER TABLE `sets`
  MODIFY `SetID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `SongID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
