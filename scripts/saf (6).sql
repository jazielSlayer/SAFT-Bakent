-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-11-2025 a las 17:42:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `saf`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autenticacion`
--

CREATE TABLE `autenticacion` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `code` varchar(6) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `autenticacion`
--

INSERT INTO `autenticacion` (`id`, `email`, `code`, `expires_at`, `created_at`) VALUES
('003e801b-bf5c-42b5-a2be-40ffbe28ec59', 'jazielarmandovargaschoque@gmail.com', '524960', '2025-11-06 16:15:31', '2025-11-06 20:05:31'),
('02a5b081-730f-46ad-91f8-cd32501a3530', 'jazielarmandovargaschoque@gmail.com', '685422', '2025-11-09 11:02:00', '2025-11-09 14:52:00'),
('0788a3fb-9cea-4e3d-a078-44d1b9d1d8e3', 'jazielarmandovargaschoque@gmail.com', '235976', '2025-11-06 01:05:47', '2025-11-06 04:55:47'),
('0b5cf9f5-bb82-4f52-8ff6-a7720d417cb6', 'jazielarmandovargaschoque@gmail.com', '282516', '2025-11-05 21:28:27', '2025-11-06 01:18:27'),
('0c975441-4487-4e82-b16b-59a7013781d3', 'jazielarmandovargaschoque@gmail.com', '686839', '2025-11-06 16:21:32', '2025-11-06 20:11:33'),
('0d098177-9e89-408c-a6ee-62506f613c28', 'jazielarmandovargaschoque@gmail.com', '254375', '2025-11-01 18:53:51', '2025-11-01 22:43:51'),
('0d878208-ebcf-40f6-b509-bc08c679497e', 'jazielarmandovargaschoque@gmail.com', '730567', '2025-11-02 14:23:43', '2025-11-02 18:13:43'),
('0e8c4751-c991-4b3a-b042-8c20467d591f', 'j.v.36977714@gmail.com', '442325', '2025-11-06 21:20:50', '2025-11-07 01:10:50'),
('0f92975d-c10a-4964-bfff-cdad7b2b8996', 'jazielarmandovargaschoque@gmail.com', '273578', '2025-11-03 08:07:55', '2025-11-03 11:57:55'),
('105d88f2-18ce-4b6e-a7a1-bd485598607f', 'jazielarmandovargaschoque@gmail.com', '448544', '2025-11-06 01:05:32', '2025-11-06 04:55:32'),
('1193ad16-7b9d-4c37-8137-c0148cf31352', 'jazielarmandovargaschoque@gmail.com', '943873', '2025-11-06 01:05:44', '2025-11-06 04:55:44'),
('138c4ec9-b360-4ddc-aa41-504edf93ff46', 'jazielarmandovargaschoque@gmail.com', '328868', '2025-11-06 16:54:04', '2025-11-06 20:44:04'),
('13c1fdf7-a321-43cb-8f1e-245a04be6585', 'sfqewfqe@gmail.com', '211596', '2025-11-02 15:15:21', '2025-11-02 19:05:21'),
('13ea6807-d04b-4606-ac5b-c26a12837bd1', 'jazielarmandovargaschoque@gmail.com', '636237', '2025-11-06 16:56:16', '2025-11-06 20:46:16'),
('14d88dee-821b-4c8f-a0c5-c441476a72fd', 'jazielarmandovargaschoque@gmail.com', '750142', '2025-11-02 14:23:37', '2025-11-02 18:13:37'),
('14db3ec4-ac8c-4564-9f9a-1740176bfa75', 'jazielarmandovargaschoque@gmail.com', '758469', '2025-11-06 00:45:42', '2025-11-06 04:35:42'),
('171fe883-d9b5-4f3f-a981-f23236027703', 'jazielarmandovargaschoque@gmail.com', '629305', '2025-11-06 16:12:43', '2025-11-06 20:02:43'),
('17416804-4fb7-4c83-9d0c-6162be1b6776', 'jazielarmandovargaschoque@gmail.com', '420373', '2025-11-05 18:09:00', '2025-11-05 21:59:00'),
('1801bd96-fd60-4959-bf90-204c7ff1a015', 'jazielarmandovargaschoque@gmail.com', '737615', '2025-11-06 21:23:34', '2025-11-07 01:13:34'),
('18a2c779-c30e-49a0-8f6c-53aa54fbddec', 'jazielarmandovargaschoque@gmail.com', '166347', '2025-11-02 15:15:31', '2025-11-02 19:05:31'),
('1ba84c38-7df5-42f6-a9ec-512e725d1fa5', 'jazielarmandovargaschoque@gmail.com', '392301', '2025-11-05 21:36:20', '2025-11-06 01:26:20'),
('1e316169-4a12-4935-9b0e-5c09f25410ab', 'jazielarmandovargaschoque@gmail.com', '906663', '2025-11-06 00:45:42', '2025-11-06 04:35:42'),
('2019fbd4-db34-487b-8bd1-f07794b2626e', 'jazielarmandovargaschoque@gmail.com', '827961', '2025-11-05 10:13:38', '2025-11-05 14:03:38'),
('21093526-990b-42fb-8e08-bb3c8ac52bb5', 'jazielarmandovargaschoque@gmail.com', '661306', '2025-11-02 15:19:45', '2025-11-02 19:09:45'),
('25efde7d-bd30-49ac-b8ce-b9c7f792643b', 'jazielarmandovargaschoque@gmail.com', '957275', '2025-11-14 15:15:22', '2025-11-14 19:05:22'),
('26178dd2-703f-465d-bff9-0f77031edf94', 'jazielarmandovargaschoque@gmail.com', '272326', '2025-11-05 10:13:35', '2025-11-05 14:03:35'),
('2d13a2ed-a3a5-42d1-910c-f6b0bc468942', 'jazielarmandovargaschoque@gmail.com', '288920', '2025-11-06 16:54:04', '2025-11-06 20:44:04'),
('2e800579-a2e5-4faa-92d3-0ac7d4d946c3', 'jazielarmandovargaschoque@gmail.com', '169499', '2025-11-06 16:10:22', '2025-11-06 20:00:22'),
('2fee6595-8b43-48fa-9f40-046bafb94cdf', 'jazielarmandovargaschoque@gmail.com', '387235', '2025-11-04 22:24:03', '2025-11-05 02:14:03'),
('2ffd4732-cc92-4ab7-9d26-f4e0054d8fc0', 'jazielarmandovargaschoque@gmail.com', '113267', '2025-11-06 16:56:18', '2025-11-06 20:46:18'),
('305f3000-06fd-44eb-9831-d47b8882278a', 'jazielarmandovargaschoque@gmail.com', '147982', '2025-11-21 14:04:10', '2025-11-21 17:54:10'),
('309c4a6a-105d-4719-9c75-b37704781d94', 'sfqewfqe@gmail.com', '659031', '2025-11-02 14:36:57', '2025-11-02 18:26:57'),
('3301d3c3-1919-4a1d-9d59-c5c1c60b9480', 'sfqewfqe@gmail.com', '569754', '2025-11-02 14:37:00', '2025-11-02 18:27:00'),
('3489c524-7c29-4fd5-86ee-bf0e9b80c027', 'jazielarmandovargaschoque@gmail.com', '906815', '2025-11-22 11:49:29', '2025-11-22 15:39:29'),
('34d4783e-4c8c-462d-8e6b-66f76d0878fc', 'jazielarmandovargaschoque@gmail.com', '734208', '2025-11-03 16:58:01', '2025-11-03 20:48:01'),
('34d4a41b-c1d0-47d7-a803-ee2647d97926', 'jazielarmandovargaschoque@gmail.com', '409962', '2025-11-06 12:45:50', '2025-11-06 16:35:50'),
('372ecea2-72a9-4f07-bd83-db87b40aec39', 'jazielarmandovargaschoque@gmail.com', '943734', '2025-11-02 15:07:38', '2025-11-02 18:57:38'),
('3aa73ab9-ea6e-484b-836b-6a5ef7ee19b9', 'jazielarmandovargaschoque@gmail.com', '767279', '2025-11-06 16:20:44', '2025-11-06 20:10:44'),
('3b2b0c4a-26da-46a8-9c4a-24163e2bdf26', 'asdfgh@gmail.com', '425212', '2025-11-05 14:15:09', '2025-11-05 18:05:09'),
('3b8b3ae3-0ed1-4d9d-8932-1695f3bc3fa5', 'jazielarmandovargaschoque@gmail.com', '268176', '2025-11-04 21:07:55', '2025-11-05 00:57:55'),
('3f5550c8-65f9-4b24-b334-e65dfaf728e1', 'jazielarmandovargaschoque@gmail.com', '732151', '2025-11-06 16:44:56', '2025-11-06 20:34:56'),
('3f674a44-2f8f-40f4-89c8-ea5f036ac37d', 'jazielarmandovargaschoque@gmail.com', '549953', '2025-11-05 21:49:04', '2025-11-06 01:39:04'),
('426f6725-c626-4213-a5af-334d60383493', 'jazielarmandovargaschoque@gmail.com', '285655', '2025-11-06 16:44:56', '2025-11-06 20:34:56'),
('428df74c-4e62-4196-b904-3b1c480605e3', 'jazielarmandovargaschoque@gmail.com', '998384', '2025-11-06 01:09:58', '2025-11-06 04:59:58'),
('4397f48a-2441-4103-9c64-fbb77106bb62', 'jazielarmandovargaschoque@gmail.com', '745569', '2025-11-06 20:55:17', '2025-11-07 00:45:17'),
('43d83c90-e512-4b0b-a35e-70bb820540ac', 'jazielarmandovargaschoque@gmail.com', '126331', '2025-11-08 12:29:08', '2025-11-08 16:19:08'),
('45c9c1b1-c3d5-4aa4-8afb-5147d891b680', 'jazielarmandovargaschoque@gmail.com', '822952', '2025-11-20 09:45:14', '2025-11-20 13:35:14'),
('464aee07-75e4-41ea-85a6-16d8a8be0bae', 'jazielarmandovargaschoque@gmail.com', '318247', '2025-11-09 11:02:05', '2025-11-09 14:52:05'),
('4817afe9-5b46-4909-b7c6-911cc4a1a1b4', 'j.v.36977714@gmail.com', '529074', '2025-11-06 21:20:50', '2025-11-07 01:10:50'),
('48da01f7-e382-4222-99cf-cdc399731c81', 'jazielarmandovargaschoque@gmail.com', '897643', '2025-11-06 01:03:35', '2025-11-06 04:53:35'),
('4973ca93-fe6c-46c0-9011-b21d2391bc03', 'jazielarmandovargaschoque@gmail.com', '170209', '2025-11-05 21:36:20', '2025-11-06 01:26:20'),
('4d10bcb5-6a7e-44a1-a88f-7d5ac23bc240', 'jazielarmandovargaschoque@gmail.com', '494959', '2025-11-06 16:44:53', '2025-11-06 20:34:53'),
('509fe743-b12e-4bba-9c5d-5d2c55bd232a', 'jazielarmandovargaschoque@gmail.com', '445108', '2025-11-06 12:45:50', '2025-11-06 16:35:50'),
('5120c224-2553-47eb-99d6-05e57ea35086', 'jazielarmandovargaschoque@gmail.com', '890773', '2025-11-06 12:46:27', '2025-11-06 16:36:27'),
('54d1f38c-1f1a-46f2-a980-9fc50c2018d1', 'jazielarmandovargaschoque@gmail.com', '955943', '2025-11-06 09:48:20', '2025-11-06 13:38:20'),
('56203f05-6312-43e8-9218-b4762a66114f', 'jazielarmandovargaschoque@gmail.com', '430081', '2025-11-03 17:37:22', '2025-11-03 21:27:22'),
('57c78291-fdf3-47d5-be72-99ed60514115', 'jazielarmandovargaschoque@gmail.com', '778503', '2025-11-22 11:49:25', '2025-11-22 15:39:25'),
('5843c0ea-d8f8-4de5-bd22-810fd09da5f5', 'jazielarmandovargaschoque@gmail.com', '410127', '2025-11-05 20:54:42', '2025-11-06 00:44:42'),
('58548c93-55f1-4c2c-b4e4-57d8ac9c8aec', 'asdfgh@gmail.com', '263087', '2025-11-05 14:15:12', '2025-11-05 18:05:12'),
('590fc666-c794-4e8f-aa4a-4c5098b24ca0', 'jazielarmandovargaschoque@gmail.com', '964657', '2025-11-03 16:58:04', '2025-11-03 20:48:04'),
('59543857-1080-4b60-882a-c51c0ca8ca58', 'jazielarmandovargaschoque@gmail.com', '838352', '2025-11-18 15:56:30', '2025-11-18 19:46:30'),
('5a5af9c9-e07e-4b5a-8466-a22de0232c42', 'jazielarmandovargaschoque@gmail.com', '266995', '2025-11-05 21:35:41', '2025-11-06 01:25:41'),
('5b132ea3-f6ae-4dd2-858b-9bab4cf36c06', 'jazielarmandovargaschoque@gmail.com', '234940', '2025-11-04 22:22:50', '2025-11-05 02:12:50'),
('5e415132-d4f8-411f-bb98-ca07b30a1f3f', 'jazielarmandovargaschoque@gmail.com', '217592', '2025-11-03 07:53:28', '2025-11-03 11:43:28'),
('6008246a-c3b4-4f70-a88e-604159ccc717', 'jazielarmandovargaschoque@gmail.com', '234764', '2025-11-02 15:18:58', '2025-11-02 19:08:58'),
('60d271dc-8ca0-4aa3-94d2-f7dce944d0f7', 'jazielarmandovargaschoque@gmail.com', '852552', '2025-11-18 15:14:06', '2025-11-18 19:04:06'),
('62677d38-f612-47db-a57e-4a6e4d102fc1', 'jazielarmandovargaschoque@gmail.com', '271348', '2025-11-18 15:56:00', '2025-11-18 19:46:00'),
('664cc924-1dae-40d4-b65a-1b8def768576', 'jazielarmandovargaschoque@gmail.com', '398837', '2025-11-06 01:03:39', '2025-11-06 04:53:39'),
('6770724c-2b9a-47f7-a726-45f645eff35a', 'jazielarmandovargaschoque@gmail.com', '963642', '2025-11-06 09:48:14', '2025-11-06 13:38:14'),
('67ab1527-3c1f-4921-a7a2-3568223d0a12', 'jazielarmandovargaschoque@gmail.com', '676234', '2025-11-06 12:45:46', '2025-11-06 16:35:46'),
('6816fd2c-5908-4ebe-b045-8fcf8d3220af', 'jazielarmandovargaschoque@gmail.com', '617111', '2025-11-05 21:32:08', '2025-11-06 01:22:08'),
('68a4ca3f-c855-4c1e-ad10-6dd982b4d1a2', 'jazielarmandovargaschoque@gmail.com', '475621', '2025-11-06 16:18:53', '2025-11-06 20:08:53'),
('6a45f1b6-ae9d-46c6-b4ee-16ba1969fba7', 'jazielarmandovargaschoque@gmail.com', '989646', '2025-11-06 21:23:37', '2025-11-07 01:13:37'),
('6f0d77dc-e253-4fd0-b0c2-cf2d36ec2b7b', 'j.v.36977714@gmail.com', '617555', '2025-11-06 21:18:33', '2025-11-07 01:08:33'),
('6f4fefad-77d0-43ac-929b-b90572bba176', 'jazielarmandovargaschoque@gmail.com', '310622', '2025-11-03 07:56:48', '2025-11-03 11:46:48'),
('7106f04c-d968-4ed7-a63c-b95870373941', 'jazielarmandovargaschoque@gmail.com', '362458', '2025-11-05 18:08:57', '2025-11-05 21:58:57'),
('7155c3c9-afcf-4721-aa3d-5692bbab4086', 'jazielarmandovargaschoque@gmail.com', '809105', '2025-11-06 01:10:01', '2025-11-06 05:00:01'),
('72dfdde3-fdcd-4663-b063-2e89d7acf26c', 'j.v.36977714@gmail.com', '351760', '2025-11-06 21:18:29', '2025-11-07 01:08:29'),
('73446e19-2ead-4ecb-ab81-bac591c6740b', 'jazielarmandovargaschoque@gmail.com', '800450', '2025-11-19 09:06:13', '2025-11-19 12:56:13'),
('743fcaef-5342-4835-a975-7440defecc05', 'jazielarmandovargaschoque@gmail.com', '709673', '2025-11-05 21:35:41', '2025-11-06 01:25:41'),
('74c25fe3-6eea-495c-99ba-ecd78e165f0f', 'jazielarmandovargaschoque@gmail.com', '287240', '2025-11-06 20:55:13', '2025-11-07 00:45:13'),
('756e920c-4ec8-4048-b745-474d114f1907', 'jazielarmandovargaschoque@gmail.com', '955441', '2025-11-18 11:15:05', '2025-11-18 15:05:05'),
('770cf591-776b-406d-97d5-eb5f82799660', 'jazielarmandovargaschoque@gmail.com', '830811', '2025-11-02 15:23:18', '2025-11-02 19:13:18'),
('778848db-2139-4de4-bcbf-98ac4fc22baa', 'jazielarmandovargaschoque@gmail.com', '796257', '2025-11-05 21:35:37', '2025-11-06 01:25:37'),
('7932c016-9f63-4c09-a09d-6cf646a55294', 'jazielarmandovargaschoque@gmail.com', '919824', '2025-11-18 15:14:09', '2025-11-18 19:04:09'),
('794d686a-56c6-4308-aad0-de59dd5f7ac2', 'jazielarmandovargaschoque@gmail.com', '594320', '2025-11-04 20:52:17', '2025-11-05 00:42:17'),
('7b130a7c-d0f8-4f27-a875-257d05781a3e', 'jazielarmandovargaschoque@gmail.com', '558902', '2025-11-05 11:05:37', '2025-11-05 14:55:37'),
('7b57df43-d107-4338-a327-d80bd8bc7f03', 'jazielarmandovargaschoque@gmail.com', '292539', '2025-11-05 17:00:32', '2025-11-05 20:50:32'),
('7b711871-7be4-43b9-aa23-704cfbb9bc04', 'jazielarmandovargaschoque@gmail.com', '420802', '2025-11-06 00:56:45', '2025-11-06 04:46:45'),
('7e29913b-55ea-42d3-b7f3-c8010411f1e8', 'jazielarmandovargaschoque@gmail.com', '747618', '2025-11-21 11:39:20', '2025-11-21 15:29:20'),
('7eb553d9-f8b1-498b-9fff-6aa0303b5011', 'jazielarmandovargaschoque@gmail.com', '138557', '2025-11-19 09:06:09', '2025-11-19 12:56:09'),
('7f7c7ea4-a1ba-43fc-842b-7f05a4e1c8dd', 'jazielarmandovargaschoque@gmail.com', '172735', '2025-11-14 15:15:20', '2025-11-14 19:05:20'),
('7fc0dc80-d3df-4557-affb-14e344427fd2', 'jazielarmandovargaschoque@gmail.com', '960171', '2025-11-02 15:23:18', '2025-11-02 19:13:18'),
('80aea7f7-4745-47ce-a824-a638b0540129', 'jazielarmandovargaschoque@gmail.com', '225380', '2025-11-04 21:07:55', '2025-11-05 00:57:55'),
('84d2a01a-41de-47f8-a465-c3cab2cf22e6', 'jazielarmandovargaschoque@gmail.com', '554314', '2025-11-05 14:18:06', '2025-11-05 18:08:06'),
('85b0e611-9564-4e03-b297-0777ba3285f0', 'jazielarmandovargaschoque@gmail.com', '898394', '2025-11-03 07:56:48', '2025-11-03 11:46:48'),
('885ca4e7-9242-4874-95b5-68de2432a47d', 'jazielarmandovargaschoque@gmail.com', '750795', '2025-11-06 16:45:07', '2025-11-06 20:35:07'),
('89d0ddf6-2210-4b35-b3b8-17ba35d04791', 'jazielarmandovargaschoque@gmail.com', '997287', '2025-11-02 14:34:38', '2025-11-02 18:24:38'),
('8cc2691a-eb67-437e-a052-2a05c3ba6e37', 'fsffews@gmail.com', '943927', '2025-11-03 07:57:45', '2025-11-03 11:47:45'),
('8e4f4ae0-cd6d-456d-92d2-ff603c5c896e', 'jazielarmandovargaschoque@gmail.com', '585377', '2025-11-05 12:37:35', '2025-11-05 16:27:35'),
('8e9ba7c0-402c-4f89-bca1-dc4b837f1c6e', 'jazielarmandovargaschoque@gmail.com', '829444', '2025-11-21 14:04:06', '2025-11-21 17:54:06'),
('8f12dd1c-272b-4214-8c03-bc0c673b24cf', 'jazielarmandovargaschoque@gmail.com', '482695', '2025-11-01 18:49:46', '2025-11-01 22:39:46'),
('90333e1f-b0ed-4a39-9f25-92f706bb9c3d', 'jazielarmandovargaschoque@gmail.com', '652201', '2025-11-06 16:13:49', '2025-11-06 20:03:49'),
('919466f0-89fe-4fd3-8ff0-c33625ddd5a6', 'jazielarmandovargaschoque@gmail.com', '621003', '2025-11-02 15:19:00', '2025-11-02 19:09:00'),
('91c2b473-3e90-47a8-8593-49db82209e8c', 'jazielarmandovargaschoque@gmail.com', '806962', '2025-11-06 12:46:27', '2025-11-06 16:36:27'),
('93f666ab-0912-479d-9acf-9acabecb00b3', 'sfqewfqe@gmail.com', '492261', '2025-11-02 15:15:21', '2025-11-02 19:05:21'),
('9466c257-1153-440c-8baf-052ac20b82a7', 'jazielarmandovargaschoque@gmail.com', '187204', '2025-11-01 18:53:51', '2025-11-01 22:43:51'),
('958d90d6-8de6-469f-8ec0-c1d01e27f002', 'jazielarmandovargaschoque@gmail.com', '489484', '2025-11-03 17:37:22', '2025-11-03 21:27:22'),
('96327658-c86c-427f-80d9-a7b1fe20b123', 'sfqewfqe@gmail.com', '993937', '2025-11-02 14:37:00', '2025-11-02 18:27:00'),
('97d88159-231e-4c08-bbf5-014da5256128', 'jazielarmandovargaschoque@gmail.com', '704590', '2025-11-02 14:23:26', '2025-11-02 18:13:26'),
('988a5144-5f1f-4ec5-b102-36e92b72c022', 'jazielarmandovargaschoque@gmail.com', '222841', '2025-11-20 09:45:09', '2025-11-20 13:35:09'),
('98963d97-878f-402d-8e47-bfe3cb261b19', 'jazielarmandovargaschoque@gmail.com', '639832', '2025-11-06 16:09:28', '2025-11-06 19:59:28'),
('9909a64d-5acc-4d3e-bd65-5f28f3f086b6', 'jazielarmandovargaschoque@gmail.com', '250566', '2025-11-02 14:28:02', '2025-11-02 18:18:02'),
('990b36b8-dac6-4d2d-a530-21fd56e8c363', 'jazielarmandovargaschoque@gmail.com', '444209', '2025-11-18 15:56:52', '2025-11-18 19:46:52'),
('9a6f4331-33f7-41d0-8d72-c5f1061f81df', 'jazielarmandovargaschoque@gmail.com', '782539', '2025-11-05 14:18:08', '2025-11-05 18:08:08'),
('9b7b198a-cea5-4cad-9be0-4a6338df960a', 'jazielarmandovargaschoque@gmail.com', '432091', '2025-11-18 12:51:15', '2025-11-18 16:41:15'),
('9c12be5d-7514-4039-8ab7-15dd5e358123', 'jazielarmandovargaschoque@gmail.com', '268292', '2025-11-02 15:18:49', '2025-11-02 19:08:49'),
('9cfafdc6-d566-49db-abfd-f23d7fc9a956', 'jazielarmandovargaschoque@gmail.com', '860567', '2025-11-06 16:20:44', '2025-11-06 20:10:44'),
('9e1af345-f8aa-444a-baac-5da50a196c20', 'jazielarmandovargaschoque@gmail.com', '618808', '2025-11-08 12:29:04', '2025-11-08 16:19:04'),
('9e683d2b-60af-460d-9eaf-61efb72c0f67', 'jazielarmandovargaschoque@gmail.com', '776719', '2025-11-19 08:38:03', '2025-11-19 12:28:03'),
('9ec2cae3-4a57-429a-831d-e3c0d91455b8', 'jazielarmandovargaschoque@gmail.com', '926396', '2025-11-02 15:14:59', '2025-11-02 19:04:59'),
('a03c43c4-e157-4454-978c-c2c2a9a18128', 'jazielarmandovargaschoque@gmail.com', '375389', '2025-11-06 00:56:45', '2025-11-06 04:46:45'),
('a3ae8df5-24d1-420d-a535-5e4b1a65d3da', 'jazielarmandovargaschoque@gmail.com', '281480', '2025-11-06 16:15:33', '2025-11-06 20:05:33'),
('a403cd84-f4e4-4e27-891a-497255d3e76e', 'jazielarmandovargaschoque@gmail.com', '229095', '2025-11-08 20:57:28', '2025-11-09 00:47:28'),
('a5e203b8-7cf6-4060-b3d2-97b7baf6c4e0', 'jazielarmandovargaschoque@gmail.com', '204037', '2025-11-06 00:35:26', '2025-11-06 04:25:26'),
('a690094f-91cc-4e35-a1e9-87b289e151f9', 'dvsdvdd@gmail.com', '270367', '2025-11-04 22:26:48', '2025-11-05 02:16:48'),
('a7d27f1f-20b3-4f1c-8ba0-85339eebd257', 'jazielarmandovargaschoque@gmail.com', '639721', '2025-11-05 21:32:08', '2025-11-06 01:22:08'),
('a85b8611-204a-4a84-b893-571145d096fa', 'jazielarmandovargaschoque@gmail.com', '241871', '2025-11-18 11:15:11', '2025-11-18 15:05:11'),
('abb6d3c3-4cc4-4e7a-9ea6-3b8ec5ae2c46', 'jazielarmandovargaschoque@gmail.com', '316715', '2025-11-06 16:06:47', '2025-11-06 19:56:47'),
('abdd6ad0-67f5-4683-834a-b865d3051868', 'jazielarmandovargaschoque@gmail.com', '725430', '2025-11-05 21:28:30', '2025-11-06 01:18:30'),
('ac92ea4a-dab0-4726-b707-06ae5298ddd2', 'jazielarmandovargaschoque@gmail.com', '982552', '2025-11-14 14:46:20', '2025-11-14 18:36:20'),
('acdedd69-6d28-4782-ba7d-f22cbb1eeb60', 'jazielarmandovargaschoque@gmail.com', '178110', '2025-11-14 14:46:17', '2025-11-14 18:36:17'),
('ad2ebf98-d2ee-4222-8c8e-c13848ec4c82', 'jazielarmandovargaschoque@gmail.com', '196438', '2025-11-06 00:35:30', '2025-11-06 04:25:30'),
('afe085ee-21df-4443-ad75-7ce2bacf2f74', 'jazielarmandovargaschoque@gmail.com', '749261', '2025-11-06 00:48:29', '2025-11-06 04:38:29'),
('b4527f81-53fa-4656-abe5-0bb794870ba8', 'jazielarmandovargaschoque@gmail.com', '707623', '2025-11-05 21:48:54', '2025-11-06 01:38:54'),
('b547f4e6-737e-4068-bf8d-3cb3710efae7', 'jazielarmandovargaschoque@gmail.com', '763096', '2025-11-06 16:15:33', '2025-11-06 20:05:33'),
('b5882ad8-8af8-4f7d-982f-b564d45498df', 'jazielarmandovargaschoque@gmail.com', '124148', '2025-11-06 16:09:31', '2025-11-06 19:59:31'),
('b68a9b3b-8ad2-4eee-8a40-3d42f74bf6b8', 'jazielarmandovargaschoque@gmail.com', '443648', '2025-11-19 08:38:03', '2025-11-19 12:28:03'),
('b7c981f6-9a9e-47ac-8b37-51e06ec7599d', 'jazielarmandovargaschoque@gmail.com', '540333', '2025-11-02 15:18:52', '2025-11-02 19:08:52'),
('bbbaa213-a19f-4e34-92eb-1c8bfb52d5b4', 'jazielarmandovargaschoque@gmail.com', '846617', '2025-11-06 16:18:53', '2025-11-06 20:08:53'),
('bccfdea4-ab45-43c1-8c51-c027b1574ac5', 'jazielarmandovargaschoque@gmail.com', '913221', '2025-11-06 16:12:43', '2025-11-06 20:02:43'),
('bd22053d-932d-4bf4-a6d9-f242bc17f79f', 'jazielarmandovargaschoque@gmail.com', '852808', '2025-11-02 15:11:52', '2025-11-02 19:01:52'),
('bf145a93-3828-4d7b-99f2-2cec33651a54', 'jazielarmandovargaschoque@gmail.com', '671850', '2025-11-06 16:45:07', '2025-11-06 20:35:07'),
('c00107d1-163c-438e-af08-006479081c4f', 'jazielarmandovargaschoque@gmail.com', '907682', '2025-11-02 15:19:48', '2025-11-02 19:09:48'),
('c020d25e-8d88-4d20-86d1-0938c3ac102d', 'jazielarmandovargaschoque@gmail.com', '380303', '2025-11-05 21:49:07', '2025-11-06 01:39:07'),
('c1742f8c-7b91-4f21-b848-37443becee76', 'jazielarmandovargaschoque@gmail.com', '108262', '2025-11-05 12:37:35', '2025-11-05 16:27:35'),
('c7114292-db3f-4e24-a023-d3b740a58a4d', 'jazielarmandovargaschoque@gmail.com', '246183', '2025-11-03 13:45:13', '2025-11-03 17:35:13'),
('ca4ca6f9-5530-4713-b747-4ba52fd9c488', 'fsffews@gmail.com', '661337', '2025-11-03 07:57:48', '2025-11-03 11:47:48'),
('cc182532-12bf-421b-a179-66d0de9faca1', 'jazielarmandovargaschoque@gmail.com', '455160', '2025-11-06 00:48:33', '2025-11-06 04:38:33'),
('cd3fe821-006d-4946-96a7-e5d4fbe514c2', 'j.v.36977714@gmail.com', '257049', '2025-11-06 16:51:57', '2025-11-06 20:41:57'),
('cd813650-558b-42f7-b8ac-27ac0b7aa86a', 'jazielarmandovargaschoque@gmail.com', '455646', '2025-11-05 17:00:29', '2025-11-05 20:50:29'),
('ce37cc98-282a-42f1-a2af-843cd3ba6bd1', 'jazielarmandovargaschoque@gmail.com', '605458', '2025-11-06 16:56:18', '2025-11-06 20:46:18'),
('d0ab579c-2037-4b69-a8c7-f486aa7cc16e', 'jazielarmandovargaschoque@gmail.com', '883506', '2025-11-06 15:57:40', '2025-11-06 19:47:40'),
('d14d5293-70ae-41ad-a906-a358accf75a9', 'dvsdvdd@gmail.com', '106219', '2025-11-04 22:26:48', '2025-11-05 02:16:48'),
('d3b97cc7-2130-4356-a7c8-7685c821f44c', 'jazielarmandovargaschoque@gmail.com', '424337', '2025-11-05 12:37:31', '2025-11-05 16:27:31'),
('d5b58e5e-eb80-40f6-8b86-3fe6dabac80f', 'jazielarmandovargaschoque@gmail.com', '286667', '2025-11-18 12:51:11', '2025-11-18 16:41:11'),
('d8317e5e-565e-4abb-a1d4-1d076d94c657', 'j.v.36977714@gmail.com', '333252', '2025-11-06 16:51:57', '2025-11-06 20:41:57'),
('d8ef252e-ef94-4d92-a92f-d20eedc24eff', 'asdfgh@gmail.com', '173700', '2025-11-05 14:15:12', '2025-11-05 18:05:12'),
('d96137ef-8994-4cf8-b74d-5bcd09c07952', 'jazielarmandovargaschoque@gmail.com', '817576', '2025-11-02 15:19:40', '2025-11-02 19:09:40'),
('d9fc7686-2b8e-4197-9929-4c5ab1fdc23d', 'jazielarmandovargaschoque@gmail.com', '292472', '2025-11-06 15:57:40', '2025-11-06 19:47:40'),
('db7ee82c-5d6b-438e-8278-b1ca9509aaf1', 'jazielarmandovargaschoque@gmail.com', '903483', '2025-11-05 21:48:54', '2025-11-06 01:38:54'),
('dd48e8bb-096c-4d6b-b0ba-a10bdf13dd9c', 'fsffews@gmail.com', '370875', '2025-11-03 07:57:48', '2025-11-03 11:47:48'),
('e011bb67-3c9b-4b6b-896c-8a7bbf1e5a73', 'jazielarmandovargaschoque@gmail.com', '469633', '2025-11-06 01:05:32', '2025-11-06 04:55:32'),
('e18626fb-4047-4776-ac35-577b183eb358', 'jazielarmandovargaschoque@gmail.com', '568310', '2025-11-05 11:05:34', '2025-11-05 14:55:34'),
('e25caca9-4712-41e1-9540-65bc1d0d0b26', 'jazielarmandovargaschoque@gmail.com', '641324', '2025-11-06 16:09:31', '2025-11-06 19:59:31'),
('e3104071-67dd-4b92-a7d4-e6e3f9f6ef0f', 'jazielarmandovargaschoque@gmail.com', '553230', '2025-11-04 22:24:03', '2025-11-05 02:14:03'),
('e3e1d672-877d-4aae-8503-e09e06b91c03', 'jazielarmandovargaschoque@gmail.com', '467579', '2025-11-06 16:10:22', '2025-11-06 20:00:22'),
('e589d45e-2472-40b5-9104-ad025d9f5510', 'dvsdvdd@gmail.com', '426125', '2025-11-04 22:26:45', '2025-11-05 02:16:45'),
('e5c0a392-c7ad-4e9f-bf28-b1902df68d23', 'jazielarmandovargaschoque@gmail.com', '639489', '2025-11-11 17:17:53', '2025-11-11 21:07:53'),
('e60bb371-466d-4ca2-b505-cae8f1faa603', 'jazielarmandovargaschoque@gmail.com', '811888', '2025-11-06 16:21:32', '2025-11-06 20:11:32'),
('e7f4497d-631d-47e6-a59b-89bb14fd735d', 'jazielarmandovargaschoque@gmail.com', '957544', '2025-11-08 20:57:24', '2025-11-09 00:47:24'),
('ea183584-b8a5-4e17-94ed-7b8d59e24d93', 'jazielarmandovargaschoque@gmail.com', '838523', '2025-11-21 11:39:20', '2025-11-21 15:29:20'),
('ea75b9d7-783b-4267-a205-fde547ac9c08', 'jazielarmandovargaschoque@gmail.com', '400608', '2025-11-02 15:19:40', '2025-11-02 19:09:40'),
('eeb990f7-b202-43d4-95bc-171e93690929', 'jazielarmandovargaschoque@gmail.com', '879231', '2025-11-11 17:18:04', '2025-11-11 21:08:04'),
('f3600406-1f01-4451-a489-f5042b8df1a3', 'jazielarmandovargaschoque@gmail.com', '432576', '2025-11-03 08:07:55', '2025-11-03 11:57:55'),
('f5cd1941-044c-4f28-8048-8b014f317b95', 'jazielarmandovargaschoque@gmail.com', '878498', '2025-11-06 00:53:43', '2025-11-06 04:43:43'),
('f6081825-c0b4-4e40-bc63-3354dff6d3c7', 'jazielarmandovargaschoque@gmail.com', '655755', '2025-11-06 00:53:43', '2025-11-06 04:43:43'),
('f6cc507b-9971-4fcd-a9d7-4b4a140f12ab', 'jazielarmandovargaschoque@gmail.com', '413062', '2025-11-02 15:18:52', '2025-11-02 19:08:52'),
('f7b041d6-8ea0-44b8-9b40-aaab360fa813', 'jazielarmandovargaschoque@gmail.com', '502194', '2025-11-03 13:45:10', '2025-11-03 17:35:10'),
('f7ce1486-fc7b-4d45-bb00-431687f0a1e8', 'jazielarmandovargaschoque@gmail.com', '560378', '2025-11-03 07:53:28', '2025-11-03 11:43:28'),
('f8b0d1b0-2590-4e5e-8f1b-d51ade671092', 'jazielarmandovargaschoque@gmail.com', '668012', '2025-11-18 12:52:10', '2025-11-18 16:42:10'),
('fa88f908-95a9-4b79-a1dd-89688ef8d384', 'jazielarmandovargaschoque@gmail.com', '221328', '2025-11-04 22:22:53', '2025-11-05 02:12:53'),
('faca288a-e8a8-4c72-b165-3f32ee73917e', 'jazielarmandovargaschoque@gmail.com', '551661', '2025-11-18 12:52:10', '2025-11-18 16:42:10'),
('fc282368-70ea-40e6-8453-56244dfd98ee', 'jazielarmandovargaschoque@gmail.com', '871438', '2025-11-02 14:34:20', '2025-11-02 18:24:20'),
('fd632a87-13b6-4485-8d21-0e52b3e46b6f', 'jazielarmandovargaschoque@gmail.com', '666301', '2025-11-04 20:52:17', '2025-11-05 00:42:17'),
('ff2674ea-9319-4916-8383-dd72ca9c8550', 'jazielarmandovargaschoque@gmail.com', '539920', '2025-11-05 20:54:45', '2025-11-06 00:44:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avance_estudiante`
--

CREATE TABLE `avance_estudiante` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_estudiante` bigint(20) UNSIGNED NOT NULL,
  `id_modulo` bigint(20) UNSIGNED NOT NULL,
  `responsable` varchar(255) NOT NULL,
  `fecha` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `avance_estudiante`
--

INSERT INTO `avance_estudiante` (`id`, `id_estudiante`, `id_modulo`, `responsable`, `fecha`, `estado`, `created_at`, `updated_at`) VALUES
(13, 25, 17, 'ProfesorX', '2025-11-20', 'Completado', '2025-11-22 00:11:34', '2025-11-22 00:11:34'),
(14, 25, 18, 'ProfesorX', '2025-11-21', 'En progreso', '2025-11-22 00:11:34', '2025-11-22 00:11:34'),
(15, 11, 17, 'Magneto', '2025-11-19', 'Completado', '2025-11-22 00:11:34', '2025-11-22 00:11:34'),
(16, 11, 19, 'ProfesorX', '2025-11-21', 'Pendiente', '2025-11-22 00:11:34', '2025-11-22 00:11:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--

CREATE TABLE `docente` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `per_id` bigint(20) UNSIGNED NOT NULL,
  `numero_item` varchar(255) NOT NULL,
  `especialidad` varchar(255) NOT NULL,
  `tipo_contrato` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `docente`
--

INSERT INTO `docente` (`id`, `per_id`, `numero_item`, `especialidad`, `tipo_contrato`, `estado`, `created_at`, `updated_at`) VALUES
(4, 5, 'DOC124', 'Matemáticas', 'permanente', 1, NULL, NULL),
(12, 39, 'DOC124', 'Física', 'interino', 1, NULL, NULL),
(16, 79, 'DOC124', 'Matemáticas', 'permanente', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `per_id` bigint(20) UNSIGNED NOT NULL,
  `id_programa_academico` bigint(20) UNSIGNED NOT NULL,
  `ru` int(5) UNSIGNED ZEROFILL NOT NULL,
  `fecha_inscripcion` date NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`id`, `per_id`, `id_programa_academico`, `ru`, `fecha_inscripcion`, `estado`, `created_at`, `updated_at`) VALUES
(11, 26, 1, 62629, '2025-09-27', 1, NULL, NULL),
(12, 36, 1, 55555, '2025-11-21', 0, NULL, NULL),
(25, 76, 1, 62634, '2025-11-05', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_auditoria`
--

CREATE TABLE `historial_auditoria` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `entidad_afectada` varchar(255) NOT NULL,
  `descripcion_operacion` varchar(255) NOT NULL,
  `fecha_operacion` varchar(255) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodologia`
--

CREATE TABLE `metodologia` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `objetivos` varchar(255) DEFAULT NULL,
  `numero_modulos` varchar(255) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_finalizacion` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `metodologia`
--

INSERT INTO `metodologia` (`id`, `nombre`, `descripcion`, `objetivos`, `numero_modulos`, `fecha_inicio`, `fecha_finalizacion`, `created_at`, `updated_at`) VALUES
(5, 'Metodología Scrum', 'Metodología para desarrollo ágil', 'Mejorar eficiencia en proyectos', '25', '2025-01-01', '2025-06-30', NULL, NULL),
(6, 'Metodología Scrull', 'Metodología para gestión de proyectos', 'Mejorar eficiencia en proyectos', '14', '2025-01-01', '2025-06-30', NULL, NULL),
(7, 'Metodolog?a SAFE 6.0 (Scaled Agile Framework)', 'Framework ?gil escalado para grandes organizaciones', 'Alinear equipos y entregar valor continuo a gran escala', '32', '2025-12-01', '2026-06-30', '2025-11-22 00:08:26', '2025-11-22 00:08:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_persona_table', 1),
(2, '0001_01_01_000001_create_users_table', 1),
(3, '0001_01_01_000002_create_cache_table', 1),
(4, '0001_01_01_000003_create_jobs_table', 1),
(5, '2025_04_21_154847_create_permission_tables', 1),
(6, '2025_05_04_234326_create_docente_table', 1),
(7, '2025_05_11_184009_create_programa_academico_table', 1),
(8, '2025_05_12_010246_create_estudiante_table', 1),
(9, '2025_05_30_182246_create_plantel_administrativo_table', 1),
(10, '2025_05_30_184831_create_proyecto_table', 1),
(11, '2025_05_30_191419_create_metodologia_table', 1),
(12, '2025_05_30_192120_create_modulo_table', 1),
(13, '2025_05_30_192840_create_pago_table', 1),
(14, '2025_05_30_193442_create_taller_table', 1),
(15, '2025_05_30_194418_create_avance_estudiante_table', 1),
(16, '2025_05_30_194822_create_observacion_table', 1),
(17, '2025_05_30_195141_create_historial_auditoria_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--

CREATE TABLE `modulo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_docente` bigint(20) UNSIGNED NOT NULL,
  `id_metodologia` bigint(20) UNSIGNED NOT NULL,
  `duracion` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_finalizacion` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `modulo`
--

INSERT INTO `modulo` (`id`, `codigo`, `nombre`, `id_docente`, `id_metodologia`, `duracion`, `descripcion`, `fecha_inicio`, `fecha_finalizacion`, `created_at`, `updated_at`) VALUES
(17, 'MOD-SAFE-01', 'PI Planning y Artefactos', 4, 7, '5 d?as', 'Planificaci?n de Incremento de Programa', '2025-12-15', '2025-12-19', '2025-11-22 00:10:55', '2025-11-22 00:10:55'),
(18, 'MOD-SAFE-02', 'Lean Portfolio Management', 16, 7, '4 d?as', 'Gesti?n de portafolio ?gil', '2025-12-22', '2025-12-26', '2025-11-22 00:10:55', '2025-11-22 00:10:55'),
(19, 'MOD-SAFE-03', 'DevOps y Release on Demand', 12, 7, '6 d?as', 'Cultura y pr?cticas DevOps en gran escala', '2026-01-05', '2026-01-12', '2025-11-22 00:10:55', '2025-11-22 00:10:55'),
(20, 'MOD-SAFE-04', 'Architectural Runway y Enablers', 4, 7, '4 d?as', 'Construcci?n de runway t?cnico y enablers', '2026-01-13', '2026-01-17', '2025-11-22 00:10:55', '2025-11-22 00:10:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observacion`
--

CREATE TABLE `observacion` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_estudiante` bigint(20) UNSIGNED NOT NULL,
  `contenido` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `fecha` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `observacion`
--

INSERT INTO `observacion` (`id`, `id_estudiante`, `contenido`, `autor`, `fecha`, `created_at`, `updated_at`) VALUES
(4, 25, 'El estudiante muestra gran inter?s en temas de arquitectura empresarial y DevOps. Recomendado para liderazgo t?cnico en el PI Planning.', 'ProfesorX', '2025-11-21', '2025-11-22 00:11:47', '2025-11-22 00:11:47'),
(5, 25, 'Entreg? el entregable del m?dulo SAFE-01 con 2 d?as de anticipaci?n y calidad sobresaliente.', 'ProfesorX', '2025-11-20', '2025-11-22 00:11:47', '2025-11-22 00:11:47'),
(6, 11, 'Necesita reforzar conceptos de Release on Demand. Se le asignar? tutor?a extra el pr?ximo viernes.', 'Magneto', '2025-11-21', '2025-11-22 00:11:47', '2025-11-22 00:11:47'),
(7, 11, 'Participaci?n activa en las sesiones de PI Planning simuladas.', 'ProfesorX', '2025-11-19', '2025-11-22 00:11:47', '2025-11-22 00:11:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_estudiante` bigint(20) UNSIGNED NOT NULL,
  `monto` decimal(8,2) NOT NULL,
  `metodo` enum('efectivo','qr','transferencia_bancaria') NOT NULL DEFAULT 'efectivo',
  `comprobante` text DEFAULT NULL,
  `fecha` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos_roles`
--

CREATE TABLE `permisos_roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_rol` bigint(20) UNSIGNED NOT NULL,
  `modulo` varchar(50) NOT NULL COMMENT 'Nombre del m?dulo (ej: personas, usuarios)',
  `puede_ver` tinyint(1) DEFAULT 1,
  `puede_crear` tinyint(1) DEFAULT 0,
  `puede_editar` tinyint(1) DEFAULT 0,
  `puede_eliminar` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `permisos_roles`
--

INSERT INTO `permisos_roles` (`id`, `id_rol`, `modulo`, `puede_ver`, `puede_crear`, `puede_editar`, `puede_eliminar`, `created_at`, `updated_at`) VALUES
(1, 1, 'personas', 1, 1, 1, 1, NULL, NULL),
(2, 1, 'usuarios', 1, 1, 1, 1, NULL, NULL),
(3, 1, 'estudiantes', 1, 1, 1, 1, NULL, NULL),
(4, 1, 'docentes', 1, 1, 1, 1, NULL, NULL),
(5, 1, 'programas', 1, 1, 1, 1, NULL, NULL),
(6, 1, 'proyectos', 1, 1, 1, 1, NULL, NULL),
(7, 1, 'modulos', 1, 1, 1, 1, NULL, NULL),
(8, 1, 'pagos', 1, 1, 1, 1, NULL, NULL),
(9, 2, 'estudiantes', 1, 0, 0, 0, NULL, NULL),
(10, 2, 'proyectos', 1, 1, 1, 0, NULL, NULL),
(11, 2, 'modulos', 1, 0, 0, 0, NULL, NULL),
(12, 2, 'avances', 1, 1, 1, 0, NULL, NULL),
(13, 3, 'proyectos', 1, 1, 1, 0, NULL, NULL),
(14, 3, 'avances', 1, 0, 0, 0, NULL, NULL),
(15, 3, 'pagos', 1, 0, 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'permiso.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(2, 'permiso.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(3, 'permiso.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(4, 'permiso.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(5, 'persona.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(6, 'persona.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(7, 'persona.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(8, 'persona.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(9, 'persona.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(10, 'usuario.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(11, 'usuario.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(12, 'usuario.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(13, 'usuario.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(14, 'usuario.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(15, 'plantel_administrativo.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(16, 'plantel_administrativo.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(17, 'plantel_administrativo.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(18, 'plantel_administrativo.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(19, 'plantel_administrativo.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(20, 'docente.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(21, 'docente.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(22, 'docente.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(23, 'docente.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(24, 'docente.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(25, 'programa_academico.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(26, 'programa_academico.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(27, 'programa_academico.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(28, 'programa_academico.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(29, 'programa_academico.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(30, 'estudiante.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(31, 'estudiante.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(32, 'estudiante.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(33, 'estudiante.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(34, 'estudiante.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(35, 'proyecto.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(36, 'proyecto.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(37, 'proyecto.revision', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(38, 'proyecto.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(39, 'proyecto.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(40, 'proyecto.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(41, 'metodologia.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(42, 'metodologia.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(43, 'metodologia.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(44, 'metodologia.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(45, 'metodologia.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(46, 'modulo.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(47, 'modulo.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(48, 'modulo.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(49, 'modulo.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(50, 'modulo.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(51, 'pago.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(52, 'pago.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(53, 'pago.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(54, 'pago.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(55, 'pago.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(56, 'taller.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(57, 'taller.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(58, 'taller.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(59, 'taller.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(60, 'taller.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(61, 'avance_estudiante.index', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(62, 'avance_estudiante.view', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(63, 'avance_estudiante.create', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(64, 'avance_estudiante.update', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20'),
(65, 'avance_estudiante.delete', 'web', '2025-06-02 13:34:20', '2025-06-02 13:34:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `apellidopat` varchar(255) DEFAULT NULL,
  `apellidomat` varchar(255) DEFAULT NULL,
  `carnet` varchar(15) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id`, `nombres`, `apellidopat`, `apellidomat`, `carnet`, `direccion`, `telefono`, `correo`, `fecha_nacimiento`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'Pablo', 'Picazo', 'Gómez', '123456789', 'Avenida Siempre Viva 456', '987654321', 'john.Picazo.update33@example.com', '1990-02-01', 0, '2025-06-02 13:34:22', '2025-06-02 13:34:22'),
(2, 'Pablo', 'Picazo', 'Gómez', '123456789', 'Calle Falsa 123', '123456789', 'juan.perez@example.com', '1990-01-01', 1, NULL, NULL),
(5, 'Pablito', 'Picazo', 'Gónzales', '029393020', 'Calle Falsa 123', '123456789', 'juan.perez@example.com', '1990-01-01', 1, NULL, NULL),
(6, 'Estudiante', 'Picazo', 'Gónzales', '029393020', 'Calle Falsa 123', '123456789', 'juan.perez@example.com', '1990-01-01', 1, NULL, NULL),
(7, 'Estudiante2', 'Katy', 'Tony', '02830328398', 'Calle Falsa 1234', '123456789', 'juan.perez@example.com', '1990-01-01', 1, NULL, NULL),
(8, 'Estudiante3', 'Deyvid', 'Tony', '02830328398', 'Calle Falsa 1234', '123456789', 'juan.perez@example.com', '1990-01-01', 1, NULL, NULL),
(26, 'Lucke', 'Skiwallker', 'Dark', '297237293', 'fmkfkwmdkwm', '927972947', 'Luke@gmail.com', '2005-03-23', 1, NULL, NULL),
(36, 'RokeChan', 'Kino', 'Miley', '333131131313', 'dsewgfrghgf', '244255366754', 'roke@gmail.com', '2002-06-11', 1, NULL, NULL),
(39, 'juan', 'Vargas', 'Dark', '241455525624', 'wfrsgrgrwgrf', '13222354255652', 'jugas@gmail.com', '2005-06-24', 1, NULL, NULL),
(68, 'Joaquin ', 'Roque ', 'Quino', '14415972', 'los pinos', '73037314', 'roquequinoj@gmail.com', '2003-06-02', 1, NULL, NULL),
(69, 'jaziel', 'choque', 'Xavier', '82973928', 'dmlmkerwnf', '38932289328', 'chavezfloresdeybyd@gmail.com', '2025-10-08', 1, NULL, NULL),
(74, 'vgwfwe', 'egwegew', 'gwegewge', 'gweegewwg', 'sgrgrwg', '3423234', 'sfqewfqe@gmail.com', '4234-03-31', 1, NULL, NULL),
(75, 'Jazielegs', 'fsfsf', 'sfsfs', 'ffsfsf', 'sffxvsz', '41231232', 'fsffews@gmail.com', '0023-03-31', 1, NULL, NULL),
(76, 'fedfsfesf', 'sfeafwsfw', 'ferewe', 'f3efwfw', 'dadadsa', '41123', 'jazielarmandovargaschoque@gmail.com', '0231-03-31', 1, NULL, NULL),
(77, 'cascsc', 'sdsca', '2afaefas', '41223', 'vacac', 'vsv', 'dvsdvdd@gmail.com', '0001-12-12', 1, NULL, NULL),
(78, 'qwertyu', 'asdfg', 'asdfg', '23456', '12345', '12345', 'asdfgh@gmail.com', '4567-03-12', 1, NULL, NULL),
(79, 'jazi', 'vajs', 'qalmjaqs', '133121', '132ewgfavsvx', '2313131', 'j.v.36977714@gmail.com', '1331-12-13', 1, NULL, NULL),
(80, 'adrian ', 'prado', 'narvaez', '123123', NULL, NULL, 'tumamaen4@gmail.com', NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plantel_administrativo`
--

CREATE TABLE `plantel_administrativo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `per_id` bigint(20) UNSIGNED NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `unidad` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa_academico`
--

CREATE TABLE `programa_academico` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `nombre_programa` varchar(255) NOT NULL,
  `modalidad` varchar(255) NOT NULL,
  `facultad` varchar(255) NOT NULL,
  `nivel` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `programa_academico`
--

INSERT INTO `programa_academico` (`id`, `codigo`, `nombre_programa`, `modalidad`, `facultad`, `nivel`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'PROG101', 'Ingeniería de Sistemas', 'presencial', 'Ingeniería', 'pregrado', 1, NULL, NULL),
(2, 'PROG102', 'Ingeniería Informática', 'semipresencial', 'Ingeniería', 'pregrado', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_docente_guia` bigint(20) UNSIGNED NOT NULL,
  `id_docente_revisor` bigint(20) UNSIGNED NOT NULL,
  `id_estudiante` bigint(20) UNSIGNED NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `linea_investigacion` varchar(255) NOT NULL,
  `area_conocimiento` varchar(255) NOT NULL,
  `calificacion` varchar(255) DEFAULT NULL,
  `calificacion2` decimal(5,2) DEFAULT NULL COMMENT 'Calificaci?n del revisor o segunda nota',
  `calificacion_final` decimal(5,2) DEFAULT NULL COMMENT 'Promedio final o calificaci?n definitiva',
  `fecha_entrega` date DEFAULT NULL,
  `fecha_defensa` date DEFAULT NULL,
  `resumen` text DEFAULT NULL,
  `observacion` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id`, `id_docente_guia`, `id_docente_revisor`, `id_estudiante`, `titulo`, `linea_investigacion`, `area_conocimiento`, `calificacion`, `calificacion2`, `calificacion_final`, `fecha_entrega`, `fecha_defensa`, `resumen`, `observacion`, `created_at`, `updated_at`) VALUES
(4, 4, 16, 25, 'Análisis de Algoritmos de Machine Learning para Predicción de Notas', 'Inteligencia Artificial', 'Ciencia de Datos', '100', 65.00, 81.00, '2025-10-20', '1899-11-30', 'Aplicación de modelos de regresión y clasificación para predecir el rendimiento académico.', 'Aprobado con observaciones menores.', '2025-11-08 16:08:00', '2025-11-22 15:42:02'),
(5, 16, 4, 11, 'Aplicación Móvil para Seguimiento de Avance Estudiantil', 'Desarrollo Móvil', 'Ingenieria de Software', '100', 61.00, 75.00, '2025-10-31', '2025-11-14', 'App hibrida para registrar avances, pagos y observaciones en tiempo real.', 'En desarrollo. Fase de diseño UI/UX.', '2025-11-08 16:08:00', '2025-11-22 02:13:59'),
(12, 4, 12, 11, 'Sistema de Gestión Académica SAF v2', 'Desarrollo de software educativo e integración de pagos', 'Ingeniería de Software y Fintech', '90', 90.00, 90.00, '2025-06-15', '2025-07-31', 'Sistema web actualizado para gestión de proyectos académicos, control de avances, pagos con QR y roles de usuarios.', 'Actualización aprobada por comité. Listo para defensa.', NULL, '2025-11-22 02:18:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `start_path` varchar(255) DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `descripcion`, `start_path`, `is_default`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Administrador del sistema con acceso completo', 'inicio', 0, 'web', '2025-06-02 13:34:25', '2025-06-02 13:34:25'),
(2, 'Docente Guia', 'Docente del sistema academico', '/docenteguia', 1, 'web', '2025-06-02 13:39:58', '2025-06-02 13:39:58'),
(3, 'Super Admin', NULL, '/dashboard', 0, 'api', NULL, NULL),
(4, 'Estudiante', 'Estudiante del sistema acad?mico', '/estudiante', 0, 'web', NULL, NULL),
(11, 'Docente Revisor', 'Revisor de proyecto', '/docenteRevisor', 1, 'web', NULL, NULL),
(12, 'Docente', 'docente', '/docente', 1, 'web', NULL, NULL),
(14, 'estudiante3', 'endwiknikwn', '/estudiante', 1, 'web', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(10, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller`
--

CREATE TABLE `taller` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `id_metodologia` bigint(20) UNSIGNED NOT NULL,
  `tipo_taller` varchar(255) NOT NULL,
  `evaluacion_final` varchar(255) NOT NULL,
  `duracion` varchar(255) NOT NULL,
  `resultado` varchar(255) DEFAULT NULL,
  `fecha_realizacion` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `taller`
--

INSERT INTO `taller` (`id`, `titulo`, `id_metodologia`, `tipo_taller`, `evaluacion_final`, `duracion`, `resultado`, `fecha_realizacion`, `created_at`, `updated_at`) VALUES
(10, 'Taller 1', 5, 'Teórico', 'excelente', '24 dias', 'exitoso', '2025-11-20', NULL, NULL),
(11, 'Taller 2', 5, 'Práctico', 'Aporbado', '25', 'exitoso', '2025-11-21', NULL, NULL),
(12, 'Taller 3', 5, 'Teórico', 'aprobado', '23', 'pediente', '2025-11-11', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `per_id` bigint(20) UNSIGNED NOT NULL,
  `id_roles` bigint(20) UNSIGNED DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `email` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user_name`, `per_id`, `id_roles`, `status`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Leon', 1, 14, 1, 'john.Picazo.update33@example.com', '2025-06-02 13:34:24', '$2y$12$ZfFIdgvk1hWFlOhqt.8fYONfqw6JEjp84jOz1tdLwQy2UnHxS/f8m', 'TmVgnAFCBr', '2025-06-02 13:34:25', '2025-06-02 13:34:25'),
(17, 'roky', 36, 1, 1, 'roke@gmail.com', NULL, '$2a$10$yGPGGlQkgJXi1pTlHnK8w.WHMci5gfLlpgDX2AGpInbc7Wmff5/6.', NULL, NULL, NULL),
(20, 'juan', 39, 2, 1, 'jugas@gmail.com', NULL, '$2a$10$BhlD7e.HzfCyMBRtM.JqX.gCmtZ9OuupFQ4hfYamvhFtp88029.5a', NULL, NULL, NULL),
(49, 'ProfesorX', 76, 1, 1, 'jazielarmandovargaschoque@gmail.com', NULL, '$2a$10$fHZvhH5KlOSRrQf52BHg6.zHhzoXIzThrJwecJX1uAZcRenA/9JPG', NULL, NULL, NULL),
(50, 'Magneto', 79, 12, 1, 'j.v.36977714@gmail.com', NULL, '$2a$10$.FLJsPlCcGiiClAWMvAHt.eAsgPF.7wXTMuRKRf0j9wIW1/6rgoVO', NULL, NULL, NULL),
(51, 'elver_gacorta', 80, 4, 1, 'tumamaen4@gmail.com', NULL, NULL, NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autenticacion`
--
ALTER TABLE `autenticacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_autenticacion_email` (`email`);

--
-- Indices de la tabla `avance_estudiante`
--
ALTER TABLE `avance_estudiante`
  ADD PRIMARY KEY (`id`),
  ADD KEY `avance_estudiante_id_estudiante_foreign` (`id_estudiante`),
  ADD KEY `avance_estudiante_id_modulo_foreign` (`id_modulo`);

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `docente_per_id_foreign` (`per_id`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_ru` (`ru`),
  ADD KEY `estudiante_per_id_foreign` (`per_id`),
  ADD KEY `estudiante_id_programa_academico_foreign` (`id_programa_academico`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `historial_auditoria`
--
ALTER TABLE `historial_auditoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `metodologia`
--
ALTER TABLE `metodologia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `modulo_id_docente_foreign` (`id_docente`),
  ADD KEY `modulo_id_metodologia_foreign` (`id_metodologia`);

--
-- Indices de la tabla `observacion`
--
ALTER TABLE `observacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `observacion_id_estudiante_foreign` (`id_estudiante`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pago_id_estudiante_foreign` (`id_estudiante`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `permisos_roles`
--
ALTER TABLE `permisos_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permisos_roles_id_rol_foreign` (`id_rol`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `plantel_administrativo`
--
ALTER TABLE `plantel_administrativo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plantel_administrativo_per_id_foreign` (`per_id`);

--
-- Indices de la tabla `programa_academico`
--
ALTER TABLE `programa_academico`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proyecto_id_docente_guia_foreign` (`id_docente_guia`),
  ADD KEY `proyecto_id_docente_revisor_foreign` (`id_docente_revisor`),
  ADD KEY `proyecto_id_estudiante_foreign` (`id_estudiante`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indices de la tabla `taller`
--
ALTER TABLE `taller`
  ADD PRIMARY KEY (`id`),
  ADD KEY `taller_id_metodologia_foreign` (`id_metodologia`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_name_unique` (`user_name`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_per_id_foreign` (`per_id`),
  ADD KEY `users_id_roles_foreign` (`id_roles`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `avance_estudiante`
--
ALTER TABLE `avance_estudiante`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `docente`
--
ALTER TABLE `docente`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_auditoria`
--
ALTER TABLE `historial_auditoria`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metodologia`
--
ALTER TABLE `metodologia`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `modulo`
--
ALTER TABLE `modulo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `observacion`
--
ALTER TABLE `observacion`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `permisos_roles`
--
ALTER TABLE `permisos_roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT de la tabla `plantel_administrativo`
--
ALTER TABLE `plantel_administrativo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `programa_academico`
--
ALTER TABLE `programa_academico`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `taller`
--
ALTER TABLE `taller`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `avance_estudiante`
--
ALTER TABLE `avance_estudiante`
  ADD CONSTRAINT `avance_estudiante_id_estudiante_foreign` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `avance_estudiante_id_modulo_foreign` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `docente`
--
ALTER TABLE `docente`
  ADD CONSTRAINT `docente_per_id_foreign` FOREIGN KEY (`per_id`) REFERENCES `persona` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `estudiante_id_programa_academico_foreign` FOREIGN KEY (`id_programa_academico`) REFERENCES `programa_academico` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `estudiante_per_id_foreign` FOREIGN KEY (`per_id`) REFERENCES `persona` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD CONSTRAINT `modulo_id_docente_foreign` FOREIGN KEY (`id_docente`) REFERENCES `docente` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `modulo_id_metodologia_foreign` FOREIGN KEY (`id_metodologia`) REFERENCES `metodologia` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `observacion`
--
ALTER TABLE `observacion`
  ADD CONSTRAINT `observacion_id_estudiante_foreign` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_id_estudiante_foreign` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `permisos_roles`
--
ALTER TABLE `permisos_roles`
  ADD CONSTRAINT `permisos_roles_id_rol_foreign` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `plantel_administrativo`
--
ALTER TABLE `plantel_administrativo`
  ADD CONSTRAINT `plantel_administrativo_per_id_foreign` FOREIGN KEY (`per_id`) REFERENCES `persona` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `proyecto_id_docente_guia_foreign` FOREIGN KEY (`id_docente_guia`) REFERENCES `docente` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `proyecto_id_docente_revisor_foreign` FOREIGN KEY (`id_docente_revisor`) REFERENCES `docente` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `proyecto_id_estudiante_foreign` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `taller`
--
ALTER TABLE `taller`
  ADD CONSTRAINT `taller_id_metodologia_foreign` FOREIGN KEY (`id_metodologia`) REFERENCES `metodologia` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_id_roles_foreign` FOREIGN KEY (`id_roles`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_per_id_foreign` FOREIGN KEY (`per_id`) REFERENCES `persona` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
