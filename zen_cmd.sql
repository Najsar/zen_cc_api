-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 28 Sty 2020, 08:43
-- Wersja serwera: 10.1.37-MariaDB
-- Wersja PHP: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `zen_cmd`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `client_pass`
--

CREATE TABLE `client_pass` (
  `id` int(11) NOT NULL,
  `client` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `time_to_use` int(11) NOT NULL,
  `date_start` datetime NOT NULL,
  `date_end` datetime NOT NULL,
  `number` int(11) NOT NULL,
  `used` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `expense_type`
--

CREATE TABLE `expense_type` (
  `id` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `expense_type`
--

INSERT INTO `expense_type` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'Wypłata gotówki', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Faktura', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Zaliczka', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `login_session`
--

CREATE TABLE `login_session` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `session` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `login_session`
--

INSERT INTO `login_session` (`id`, `user_id`, `session`, `date`, `createdAt`, `updatedAt`) VALUES
(35, 1, 'qMxCAjriV3nwe9WI', '2019-10-07 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(36, 1, 'd9eM8qfqnsuWHgKA', '2019-10-07 14:48:54', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(37, 1, 'Kb3UttX91hWLFAvF', '2019-10-07 14:50:44', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(38, 1, 'EHUrGCfjWnOrDh1U', '2019-10-07 14:51:11', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(39, 1, 'Uj1RfPCobinoTYzu', '2019-10-07 14:51:27', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(40, 1, 'G231mfvH8TZaZsVS', '2019-10-07 15:49:22', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(41, 1, 'Ihb5PJoEFU3Jt68E', '2019-10-08 08:45:29', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(42, 1, 'fuHZrg6VBQ3otDDH', '2019-10-08 13:42:50', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(43, 1, 'IlSktOaFzNEhQBeE', '2019-10-09 09:24:36', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(44, 1, 'NLwYO5tHQ3rBnmp6', '2019-10-09 12:17:35', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(45, 1, 'SVGxN1tRcQv2rzMQ', '2019-10-10 08:16:18', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(46, 1, 'ef1SmsMDOU06kceH', '2019-10-11 08:58:14', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(47, 1, '0NVcaReswlDuCXln', '2019-10-14 08:32:13', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(48, 1, '2IWs2j2Odx5Te2Z1', '2019-10-15 08:00:28', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(49, 1, 'M3n47ACyzFvN3GX3', '2019-10-16 08:04:34', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(50, 1, 'DwwEtyKGhil4tUKx', '2019-10-17 09:32:42', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(51, 1, 'Uc2G3pV2pJCouLMx', '2019-10-17 09:53:51', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(52, 2, 'lT7Ebbz9jfsGOya7', '2019-10-17 10:02:21', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(53, 1, 'tllmBwE48K9wfuij', '2019-10-17 10:06:32', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(54, 1, 'sgLKR8LKsIdPXOd7', '2019-10-17 10:16:28', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(55, 1, '38E3xHl4TtHkt7rm', '2019-10-18 09:19:29', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(56, 1, 'BhP0o7WqKLfS2Zya', '2019-10-21 10:39:34', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(57, 1, 'UC5dwekThAqVm1pS', '2019-11-04 09:05:51', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(58, 1, 'F7PzIdMqRXLGhppH', '2019-11-13 12:08:18', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(59, 1, 'mPNbMYkdPIIXJi3G', '2019-11-14 13:18:30', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(60, 1, 'qHPOpMroC9uxZy4W', '2019-11-14 14:52:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(61, 3, 'we42kP2bdcIzBNA3', '2019-11-19 09:25:05', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(62, 1, 'J9ApjvczyBsDNU5S', '2019-11-20 08:42:38', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(63, 1, 'EzZILbzZovFyZ87E', '2019-11-20 09:26:50', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(64, 1, 'txrE6e6v4QL5HExy', '2019-11-21 14:01:16', '2019-11-21 14:01:16', '2019-11-21 14:01:16'),
(65, 1, '0uIdnAM9SS4VfuMP', '2019-11-21 14:03:02', '2019-11-21 14:03:02', '2019-11-21 14:03:02'),
(66, 1, 'kX4fyXxWno4nDLS3', '2019-11-21 14:08:02', '2019-11-21 14:08:02', '2019-11-21 14:08:02'),
(67, 1, 'AYPndvNXgehpUDqZ', '2019-11-21 14:09:59', '2019-11-21 14:09:59', '2019-11-21 14:09:59'),
(68, 1, '8A7NuuyEgyCgQ8av', '2019-11-20 00:00:00', '2019-11-22 07:19:05', '2019-11-22 07:19:05'),
(70, 1, 'l2ZwnSFWCZE3eq9i', '2019-11-22 07:40:17', '2019-11-22 07:40:17', '2019-11-22 07:40:17'),
(73, 1, 'QmSMOzbi2c2CcOVl', '2019-11-23 07:52:31', '2019-11-22 07:52:31', '2019-11-22 07:52:31'),
(74, 1, 'ruZGRG4ZyVU6lAtg', '2019-11-27 08:08:36', '2019-11-26 08:08:36', '2019-11-26 08:08:36'),
(75, 1, 'JDOhb097wuojP4IB', '2019-11-29 07:04:07', '2019-11-28 07:04:07', '2019-11-28 07:04:07'),
(78, 1, 'c61IhtpTJU7nPyH8', '2019-11-29 07:27:30', '2019-11-28 07:27:30', '2019-11-28 07:27:30'),
(79, 1, 'AZ1zL8q6Am8QbTgp', '2019-11-29 10:48:35', '2019-11-28 10:48:35', '2019-11-28 10:48:35'),
(80, 1, 'TFRh1xFTUFuJPYq6', '2019-11-29 10:49:37', '2019-11-28 10:49:37', '2019-11-28 10:49:37'),
(81, 1, 'BRB73tqaQaUcvniP', '2019-11-29 10:51:12', '2019-11-28 10:51:12', '2019-11-28 10:51:12'),
(82, 1, 'u61VSMo3fZ8GgMNS', '2019-11-29 10:56:59', '2019-11-28 10:56:59', '2019-11-28 10:56:59'),
(83, 1, 'UIDb5Z50KZMJo6Yq', '2019-11-29 12:02:07', '2019-11-28 12:02:07', '2019-11-28 12:02:07'),
(84, 1, 'QqjN7PdALgjt23LA', '2019-11-29 12:03:20', '2019-11-28 12:03:20', '2019-11-28 12:03:20'),
(85, 1, 'P0rCX6BHhopxHuAz', '2019-11-29 12:04:11', '2019-11-28 12:04:11', '2019-11-28 12:04:11'),
(86, 1, 's7JUCyolSjCuGO7e', '2019-11-29 12:09:29', '2019-11-28 12:09:29', '2019-11-28 12:09:29'),
(87, 1, 'kdoi9pUkWLH5GFfb', '2019-11-29 12:15:09', '2019-11-28 12:15:09', '2019-11-28 12:15:09'),
(88, 1, 'Bvv3jclgg5vEIQFN', '2019-11-29 12:19:08', '2019-11-28 12:19:08', '2019-11-28 12:19:08'),
(89, 1, '8dXvDkpw10H9gUi4', '2019-11-29 12:19:43', '2019-11-28 12:19:43', '2019-11-28 12:19:43'),
(90, 1, 'DwIAbm5zrniObJGf', '2019-11-29 12:20:04', '2019-11-28 12:20:04', '2019-11-28 12:20:04'),
(91, 1, '4uniWmhtsEZkkVGU', '2019-11-30 13:29:43', '2019-11-29 13:29:43', '2019-11-29 13:29:43'),
(92, 1, 'qCTRsFTVerlF8UST', '2019-12-03 07:31:59', '2019-12-02 07:31:59', '2019-12-02 07:31:59'),
(93, 1, 'wrgyyTCFu2yMIeJy', '2019-12-14 08:37:47', '2019-12-13 08:37:47', '2019-12-13 08:37:47'),
(94, 1, '1F5AXvc2mcCymQ1f', '2019-12-14 08:39:15', '2019-12-13 08:39:15', '2019-12-13 08:39:15'),
(95, 1, 'UNsoUF0519JFPhRB', '2019-12-18 10:39:07', '2019-12-17 10:39:07', '2019-12-17 10:39:07'),
(96, 1, 'Ec31YWHgV7GassWK', '2019-12-24 09:08:53', '2019-12-23 09:08:53', '2019-12-23 09:08:53'),
(97, 1, 'uNbqA9vddXNteZBA', '2019-12-24 14:18:03', '2019-12-23 14:18:03', '2019-12-23 14:18:03'),
(98, 1, 'eQeip9XOv7XB3OsS', '2019-12-28 08:51:05', '2019-12-27 08:51:05', '2019-12-27 08:51:05'),
(99, 1, '8hwjlfuAiILkgSrL', '2020-01-18 13:04:48', '2020-01-17 13:04:48', '2020-01-17 13:04:48');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `description` varchar(64) COLLATE utf8_polish_ci NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `payment_method`
--

CREATE TABLE `payment_method` (
  `id` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `use_in_report` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `payment_method`
--

INSERT INTO `payment_method` (`id`, `type`, `use_in_report`, `createdAt`, `updatedAt`) VALUES
(2, 'Gotówka', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Karta', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Przelew', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'Sieć Partnerska', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `product_list`
--

CREATE TABLE `product_list` (
  `id` int(11) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `price` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `countable` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `product_list`
--

INSERT INTO `product_list` (`id`, `type`, `name`, `price`, `countable`, `amount`, `createdAt`, `updatedAt`) VALUES
(1, 1, '15min', '19', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 1, '30min', '29', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 1, '60min', '49', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 1, 'DUO', '89', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 1, 'Family', '169', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 7, 'Urodziny 1.5h Pn-Czw', '319', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 7, 'Urodziny 2.5h Pn-Czw', '419', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 7, 'Urodziny 1.5h Weekend', '399', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 7, 'Urodziny 2.5h Weekend', '499', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 2, '30min 1os', '24.99', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 2, '60min 1os', '45.99', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 2, '120min 1os', '89.99', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 2, '30min 2os', '45.99', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 2, '60min 2os', '89.99', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 2, '120min 2os', '179.99', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 2, '30min 4os', '99.99', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 2, '60min 4os', '179.99', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 2, '120min 4os', '349.99', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 2, '30min 6os', '149.99', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 2, '60min 6os', '249.99', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 2, '120min 6os', '499.99', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, 3, '15min 2os', '39', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, 3, '30min 2os', '59', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(26, 3, '60min 2os', '89', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(27, 3, '15min 1os', '19', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(28, 3, '30min 1os', '29', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(29, 3, '60min 1os', '49', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(30, 3, '15min bolid', '19', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(31, 6, 'Zaliczka', '0', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(32, 9, 'PC Store - bon', '0', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `product_type`
--

CREATE TABLE `product_type` (
  `id` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `cash` int(11) DEFAULT NULL,
  `use_in_bonus` int(11) DEFAULT NULL,
  `fixed_price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `product_type`
--

INSERT INTO `product_type` (`id`, `type`, `cash`, `use_in_bonus`, `fixed_price`, `createdAt`, `updatedAt`) VALUES
(1, 'VR', 1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Grupon', 0, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Super Prezenty', 0, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Produkt', 1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Gadżet', 1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Zaliczka', 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'Urodziny', 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'PC Store', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `start_cash` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `cash` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `card` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `expense` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `pcstore` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `grupon` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `s_prezenty` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `profit` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `partners` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `exchange` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `bonus` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `end_balance` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `reports`
--

INSERT INTO `reports` (`id`, `start_cash`, `cash`, `card`, `expense`, `pcstore`, `grupon`, `s_prezenty`, `profit`, `partners`, `exchange`, `bonus`, `end_balance`, `date`, `createdAt`, `updatedAt`) VALUES
(10, '2000', '49', '49', '49', '0', '89.99', '0', '187.99', '89.99', '0', '9.8', '2000', '2019-10-16 11:56:32', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, '2000', '307', '98', '49', '0', '89.99', '0', '494.99', '89.99', '0', '40.5', '2258', '2019-10-17 12:46:31', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, '2258', '179', '49', '50', '0', '0', '0', '228', '0', '0', '22.8', '2387', '2019-10-18 09:20:42', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, '2387', '551.1', '218', '1050', '59.99', '204.98', '89', '1123.07', '353.97', '0', '76.91', '1888.1', '2019-10-21 10:46:26', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, '1888.1', '49', '0', '0', '49', '0', '0', '49', '0', '0', '4.9', '1937.1', '2019-10-28 08:40:38', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, '1937.1', '59', '0', '0', '150', '0', '59', '209', '150', '0', '5.9', '1996.1', '2019-11-05 13:21:47', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, '1996.1', '5039', '4990', '5000', '0', '45.99', '0', '10074.99', '45.99', '0', '1002.9', '2035.1', '2019-11-20 08:45:33', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20191120115131-create-users.js'),
('20191120115426-create-sessions.js'),
('20191120121726-create-reports.js'),
('20191120121851-create-product-type.js'),
('20191120122006-create-product-list.js'),
('20191120122100-create-payment-method.js'),
('20191120122159-create-login-session.js'),
('20191120122236-create-expense-type.js');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `sort` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `payment` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `main_price` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `price` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `paid_price` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `exchange` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `sessions`
--

INSERT INTO `sessions` (`id`, `sort`, `category`, `type`, `payment`, `main_price`, `price`, `paid_price`, `exchange`, `time`, `createdAt`, `updatedAt`) VALUES
(37, 'Przychód', 'VR', '60min', 'Gotówka', '49', '49', '49', '0', '2019-09-11 09:43:08', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(38, 'Przychód', 'PC Store', 'PC Store - bon', 'Sieć Partnerska', '0', '169', '169', '0', '2019-10-11 09:45:51', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(39, 'Przychód', 'VR', '60min', 'Gotówka', '49', '49', '49', '0', '2019-10-11 09:55:07', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(40, 'Przychód', 'Grupon', '120min 6os', 'Sieć Partnerska', '499.99', '499.99', '499.99', '0', '2019-10-10 10:05:56', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(41, 'Przychód', 'Urodziny', 'Urodziny 2.5h Pn-Czw', 'Przelew', '419', '419', '419', '0', '2019-10-11 10:09:54', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(42, 'Rozchód', 'Wypłata gotówki', 'Dla mnie', 'Gotówka', '-150', '-150', '-150', '0', '2019-10-11 10:17:44', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(43, 'Rozchód', 'Zaliczka', 'Patryk', 'Gotówka', '-150', '-150', '-150', '0', '2019-10-11 10:18:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(44, 'Przychód', 'Zaliczka', 'Zaliczka', 'Gotówka', '0', '50', '50', '0', '2019-10-11 11:54:46', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(45, 'Przychód', 'VR', 'Family', 'Karta', '169', '169', '169', '0', '2019-10-11 11:55:10', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(47, 'Rozchód', 'Faktura', 'Komputer zenon', 'Gotówka', '-1599.99', '-1599.99', '-1599.99', '0', '2019-10-11 11:55:50', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(48, 'Rozchód', 'Wypłata gotówki', 'kradziesz', 'Gotówka', '-1500', '-1500', '-1500', '0', '2019-10-11 12:08:18', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(49, 'Przychód', 'PC Store', 'PC Store - bon', 'Gotówka', '0', '169', '169', '0', '2019-10-11 12:15:33', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(50, 'Przychód', 'Grupon', '120min 6os', 'Karta', '499.99', '499.99', '499.99', '0', '2019-10-11 12:48:56', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(51, 'Przychód', 'VR', 'DUO', 'Gotówka', '89', '89', '100', '11', '2019-10-11 15:34:31', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(52, 'Przychód', 'VR', '60min', 'Gotówka', '49', '49', '49', '0', '2019-10-14 08:32:25', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(53, 'Rozchód', 'Wypłata gotówki', '', 'Gotówka', '-50', '-50', '-50', '0', '2019-10-14 08:32:39', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(54, 'Przychód', 'VR', '60min', 'Przelew', '49', '49', '49', '0', '2019-10-14 14:42:42', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(55, 'Przychód', 'Zaliczka', 'Zaliczka', 'Gotówka', '0', '50', '50', '0', '2019-10-14 14:57:57', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(56, 'Przychód', 'VR', 'Family', 'Karta', '169', '169', '169', '0', '2019-10-14 15:21:42', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(57, 'Przychód', 'VR', '30min', 'Karta', '29', '29', '29', '0', '2019-10-14 15:23:28', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(58, 'Przychód', 'Super Prezenty', '60min 2os', 'Sieć Partnerska', '89', '89', '89', '0', '2019-10-15 08:00:52', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(59, 'Przychód', 'VR', '30min', 'Gotówka', '29', '29', '29', '0', '2019-10-15 14:01:40', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(60, 'Przychód', 'VR', '60min', 'Gotówka', '49', '49', '49', '0', '2019-10-15 15:49:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(61, 'Przychód', 'Grupon', '120min 2os', 'Sieć Partnerska', '179.99', '179.99', '179.99', '0', '2019-10-16 08:04:54', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(62, 'Przychód', 'Urodziny', 'Urodziny 1.5h Pn-Czw', 'Gotówka', '319', '319', '320', '1', '2019-10-16 11:11:25', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(63, 'Przychód', 'VR', '60min', 'Karta', '49', '49', '49', '0', '2019-10-16 11:11:41', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(64, 'Przychód', 'PC Store', 'PC Store - bon', 'Sieć Partnerska', '0', '59.99', '59.99', '0', '2019-10-16 11:11:55', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(65, 'Przychód', 'Super Prezenty', '60min 2os', 'Sieć Partnerska', '89', '89', '89', '0', '2019-10-16 11:12:05', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(66, 'Przychód', 'VR', '60min', 'Gotówka', '49', '49', '50', '1', '2019-10-16 11:12:17', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(67, 'Przychód', 'VR', 'DUO', 'Gotówka', '89', '89', '100', '11', '2019-10-16 11:12:28', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(68, 'Przychód', 'VR', 'Family', 'Karta', '169', '169', '169', '0', '2019-10-16 11:12:42', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(69, 'Przychód', 'VR', '60min', 'Gotówka', '49', '44.1', '45', '0.9', '2019-10-16 11:12:57', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(70, 'Przychód', 'Grupon', '30min 1os', 'Sieć Partnerska', '24.99', '24.99', '24.99', '0', '2019-10-16 11:13:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(71, 'Rozchód', 'Wypłata gotówki', '', 'Gotówka', '-1000', '-1000', '-1000', '0', '2019-10-16 11:17:44', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(72, 'Rozchód', 'Wypłata gotówki', '', 'Gotówka', '-50', '-50', '-50', '0', '2019-10-16 11:46:11', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(73, 'Przychód', 'Zaliczka', 'Zaliczka', 'Gotówka', '0', '50', '50', '0', '2019-10-16 12:58:11', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(74, 'Przychód', 'VR', '60min', 'Gotówka', '49', '49', '49', '0', '2019-10-17 09:35:02', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(75, 'Przychód', 'VR', '60min', 'Karta', '49', '49', '49', '0', '2019-10-17 09:37:39', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(76, 'Przychód', 'Grupon', '60min 2os', 'Sieć Partnerska', '89.99', '89.99', '89.99', '0', '2019-10-17 09:38:34', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(77, 'Rozchód', 'Faktura', '', 'Gotówka', '-49', '-49', '-49', '0', '2019-10-17 09:38:50', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(78, 'Przychód', 'VR', '60min', 'Karta', '49', '49', '49', '0', '2019-10-17 12:45:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(79, 'Przychód', 'VR', 'DUO', 'Gotówka', '89', '89', '89', '0', '2019-10-17 12:46:10', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(80, 'Przychód', 'VR', 'Family', 'Gotówka', '169', '169', '169', '0', '2019-10-17 12:46:21', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(81, 'Przychód', 'VR', '30min', 'Gotówka', '29', '29', '29', '0', '2019-10-18 09:19:51', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(82, 'Przychód', 'Zaliczka', 'Zaliczka', 'Gotówka', '0', '150', '150', '0', '2019-10-18 09:20:03', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(83, 'Rozchód', 'Zaliczka', '', 'Gotówka', '-50', '-50', '-50', '0', '2019-10-18 09:20:09', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(84, 'Przychód', 'VR', '60min', 'Karta', '49', '49', '49', '0', '2019-10-18 09:20:27', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(85, 'Przychód', 'PC Store', 'PC Store - bon', 'Gotówka', '0', '49', '49', '0', '2019-10-28 08:40:29', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(86, 'Przychód', 'Super Prezenty', '30min 2os', 'Gotówka', '59', '59', '59', '0', '2019-11-05 13:21:17', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(87, 'Przychód', 'PC Store', 'PC Store - bon', 'Sieć Partnerska', '0', '150', '150', '0', '2019-11-05 13:21:28', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(88, 'Przychód', 'VR', '15min', 'Gotówka', '19', '19', '19', '0', '2019-11-19 13:04:06', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(89, 'Przychód', 'VR', '60min', 'Gotówka', '49', '49', '49', '0', '2019-11-20 08:43:04', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(90, 'Przychód', 'Grupon', '60min 1os', 'Sieć Partnerska', '45.99', '45.99', '45.99', '0', '2019-11-20 08:43:14', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(91, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Karta', '499', '499', '499', '0', '2019-11-20 08:43:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(92, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Karta', '499', '499', '499', '0', '2019-11-20 08:43:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(93, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Karta', '499', '499', '499', '0', '2019-11-20 08:43:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(94, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Karta', '499', '499', '499', '0', '2019-11-20 08:43:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(95, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Karta', '499', '499', '499', '0', '2019-11-20 08:43:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(96, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Karta', '499', '499', '499', '0', '2019-11-20 08:43:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(97, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Karta', '499', '499', '499', '0', '2019-11-20 08:43:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(98, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Karta', '499', '499', '499', '0', '2019-11-20 08:43:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(99, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Karta', '499', '499', '499', '0', '2019-11-20 08:43:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(100, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Karta', '499', '499', '499', '0', '2019-11-20 08:43:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(101, 'Rozchód', 'Wypłata gotówki', '', 'Gotówka', '-5000', '-5000', '-5000', '0', '2019-11-20 08:44:29', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(102, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Gotówka', '499', '499', '499', '0', '2019-11-20 08:45:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(103, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Gotówka', '499', '499', '499', '0', '2019-11-20 08:45:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(104, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Gotówka', '499', '499', '499', '0', '2019-11-20 08:45:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(105, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Gotówka', '499', '499', '499', '0', '2019-11-20 08:45:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(106, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Gotówka', '499', '499', '499', '0', '2019-11-20 08:45:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(107, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Gotówka', '499', '499', '499', '0', '2019-11-20 08:45:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(108, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Gotówka', '499', '499', '499', '0', '2019-11-20 08:45:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(109, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Gotówka', '499', '499', '499', '0', '2019-11-20 08:45:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(110, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Gotówka', '499', '499', '499', '0', '2019-11-20 08:45:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(111, 'Przychód', 'Urodziny', 'Urodziny 2.5h Weekend', 'Gotówka', '499', '499', '499', '0', '2019-11-20 08:45:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `Pass` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `Salt` varchar(255) COLLATE utf8_polish_ci DEFAULT NULL,
  `isAdmin` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `Name`, `Pass`, `Salt`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2a$10$fAVzpBQXRPN0W1aWzc57keVh/nTS5akcoaptcdojVoGQ/8iBHEPWm', 'zI0suHm808BhQrMp', 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'operator', '243c8fb6c59a20dfec4beb9c7f7048824c6689681e48850f7361ebd8b5c0ac5d', 'SIkLdHX6oR5lMtcc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'zenonvr', '8453b1997534c11866261d6bda12435040961e901fa4465d7c06ae269d83121f', 'qoru5lyZAlHUjqrd', 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `client_pass`
--
ALTER TABLE `client_pass`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `expense_type`
--
ALTER TABLE `expense_type`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `login_session`
--
ALTER TABLE `login_session`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `product_list`
--
ALTER TABLE `product_list`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `client_pass`
--
ALTER TABLE `client_pass`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `expense_type`
--
ALTER TABLE `expense_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `login_session`
--
ALTER TABLE `login_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT dla tabeli `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `product_list`
--
ALTER TABLE `product_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT dla tabeli `product_type`
--
ALTER TABLE `product_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT dla tabeli `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT dla tabeli `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
