-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2023 at 05:23 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lynxrides`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'BMW', '2023-12-23 16:20:46', '2023-12-23 16:20:46'),
(2, 'Mercedes', '2023-12-23 16:20:46', '2023-12-23 16:20:46'),
(3, 'Ford', '2023-12-23 16:20:46', '2023-12-23 16:20:46'),
(4, 'Kia', '2023-12-23 16:20:46', '2023-12-23 16:20:46'),
(5, 'Nissan', '2023-12-23 16:20:46', '2023-12-23 16:20:46'),
(7, 'Audi', '2023-12-24 14:10:04', '2023-12-24 14:10:04'),
(10, 'fiat', '2023-12-25 08:43:35', '2023-12-25 08:43:35'),
(11, 'Chevrolet', '2023-12-25 10:55:47', '2023-12-25 10:55:47'),
(12, 'Bugatti', '2023-12-25 10:56:08', '2023-12-25 10:56:08');

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `location_id` bigint(20) UNSIGNED NOT NULL,
  `img` varchar(255) NOT NULL,
  `car_license` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price_day` double(8,2) NOT NULL,
  `model` varchar(255) DEFAULT NULL,
  `withDriver` tinyint(1) NOT NULL DEFAULT 0,
  `availability` tinyint(1) NOT NULL DEFAULT 1,
  `brand_id` bigint(20) UNSIGNED NOT NULL,
  `owner_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('Reject','pending','Accept') NOT NULL DEFAULT 'pending',
  `gear` enum('manual','automatic') NOT NULL,
  `fuel_type` enum('electric','hybrid','gas','disel') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `location_id`, `img`, `car_license`, `description`, `price_day`, `model`, `withDriver`, `availability`, `brand_id`, `owner_id`, `status`, `gear`, `fuel_type`, `created_at`, `updated_at`) VALUES
(5, 1, '1703511743.webp', '1703511743.webp', NULL, 35.00, '500E', 0, 1, 10, 3, 'Accept', 'automatic', 'electric', '2023-12-25 10:42:23', '2023-12-25 11:10:18'),
(6, 5, '1703511800.jpg', '1703511800.webp', NULL, 70.00, '500E', 0, 1, 10, 4, 'Accept', 'automatic', 'electric', '2023-12-25 10:43:20', '2023-12-25 11:10:17'),
(7, 2, '1703511862.webp', '1703511862.webp', NULL, 80.00, 'F150', 0, 1, 3, 5, 'Accept', 'automatic', 'gas', '2023-12-25 10:44:22', '2023-12-25 11:10:17'),
(8, 1, '1703511931.jpg', '1703511931.webp', NULL, 45.00, 'Fusion', 0, 1, 3, 6, 'Accept', 'automatic', 'hybrid', '2023-12-25 10:45:31', '2023-12-25 11:10:14'),
(9, 4, '1703512075.jpg', '1703512075.webp', NULL, 55.00, 'Fusion 2019', 1, 1, 3, 8, 'Accept', 'automatic', 'hybrid', '2023-12-25 10:47:55', '2023-12-25 11:10:13'),
(10, 3, '1703512234.webp', '1703512234.webp', NULL, 120.00, 'Mustang', 1, 1, 3, 11, 'Accept', 'manual', 'gas', '2023-12-25 10:50:34', '2023-12-25 11:10:12'),
(11, 1, '1703512326.jpg', '1703512326.webp', NULL, 15.00, 'Sephia', 0, 1, 4, 2, 'Accept', 'automatic', 'gas', '2023-12-25 10:52:06', '2023-12-25 11:10:12'),
(12, 5, '1703512439.jpg', '1703512439.webp', NULL, 35.00, 'Cerato 2018', 0, 1, 4, 3, 'Accept', 'automatic', 'gas', '2023-12-25 10:53:59', '2023-12-25 11:10:11'),
(14, 1, '1703512992.jpg', '1703512992.jpg', NULL, 135.00, 'Camaro ss', 0, 1, 11, 5, 'Accept', 'automatic', 'gas', '2023-12-25 11:03:12', '2023-12-25 11:10:10'),
(15, 1, '1703513079.jpg', '1703513079.jpg', NULL, 500.00, 'Cheron', 0, 1, 12, 2, 'Accept', 'automatic', 'hybrid', '2023-12-25 11:04:39', '2023-12-25 11:10:10'),
(16, 4, '1703513150.jpg', '1703513150.jpg', NULL, 750.00, '2023', 1, 1, 12, 6, 'Accept', 'automatic', 'hybrid', '2023-12-25 11:05:50', '2023-12-25 11:10:09'),
(17, 1, '1703513202.jpg', '1703513202.webp', NULL, 180.00, '350c', 1, 1, 2, 4, 'Accept', 'automatic', 'gas', '2023-12-25 11:06:42', '2023-12-25 11:10:08'),
(21, 1, '1703514552.jpg', '1703514552.webp', NULL, 250.00, 'Rss', 1, 1, 7, 2, 'Accept', 'automatic', 'gas', '2023-12-25 11:29:12', '2023-12-25 11:29:22'),
(22, 2, '1703515715.jpg', '1703515715.webp', NULL, 30.00, NULL, 1, 1, 2, 5, 'Accept', 'automatic', 'hybrid', '2023-12-25 11:48:35', '2023-12-25 12:12:09'),
(23, 4, '1703516114.png', '1703516114.webp', NULL, 45.00, NULL, 1, 1, 1, 9, 'Accept', 'automatic', 'hybrid', '2023-12-25 11:55:14', '2023-12-25 12:17:38'),
(24, 3, '1703516504.jpg', '1703516504.webp', NULL, 60.00, '2015', 1, 1, 7, 19, 'Accept', 'manual', 'gas', '2023-12-25 12:01:43', '2023-12-25 12:01:44'),
(25, 1, '1703516670.jpg', '1703516670.webp', NULL, 55.00, NULL, 1, 1, 2, 36, 'Accept', 'automatic', 'electric', '2023-12-25 12:04:30', '2023-12-25 12:04:30'),
(26, 4, '1703516964.jpg', '1703516964.webp', NULL, 35.00, NULL, 1, 1, 2, 3, 'Accept', 'manual', 'electric', '2023-12-25 12:09:24', '2023-12-25 12:12:05');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `content` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `car_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `content`, `user_id`, `car_id`, `created_at`, `updated_at`) VALUES
(3, 'nice car', 52, 11, '2023-12-25 13:10:57', '2023-12-25 13:10:57');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `driver_license` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `img`, `driver_license`, `age`, `user_id`, `created_at`, `updated_at`) VALUES
(1, '1703497732.jpg', '1703497732.jpg', 19, 4, '2023-12-25 06:48:52', '2023-12-25 06:48:52'),
(2, '1703514520.jpg', '1703514520.jpg', 25, 2, '2023-12-25 11:14:34', '2023-12-25 11:28:40'),
(3, '1703515643.jpg', '1703515643.jpg', 30, 5, '2023-12-25 11:47:23', '2023-12-25 11:47:23'),
(4, '1703515944.jpg', '1703515944.jpg', 28, 8, '2023-12-25 11:52:24', '2023-12-25 11:52:24'),
(5, '1703516071.jpg', '1703516071.jpg', 29, 9, '2023-12-25 11:54:31', '2023-12-25 11:54:31'),
(6, '1703516232.jpg', '1703516232.jpg', 33, 11, '2023-12-25 11:57:12', '2023-12-25 11:57:12'),
(7, '1703516571.jpg', '1703516571.jpg', 40, 36, '2023-12-25 12:00:08', '2023-12-25 12:02:51'),
(8, '1703515643.jpg', '1703515643.jpg', 30, 19, '2023-12-25 11:47:23', '2023-12-25 11:47:23'),
(9, '1703516819.jpg', '1703516819.jpg', 35, 6, '2023-12-25 12:06:59', '2023-12-25 12:06:59'),
(10, '1703517255.jpg', '1703517255.jpg', 33, 3, '2023-12-25 12:14:15', '2023-12-25 12:14:15');

-- --------------------------------------------------------

--
-- Table structure for table `emails`
--

CREATE TABLE `emails` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `emails`
--

INSERT INTO `emails` (`id`, `email`, `created_at`, `updated_at`) VALUES
(1, 'admin@example.com', '2023-12-23 16:33:13', '2023-12-23 16:33:13'),
(2, 'hi@gmail.com', '2023-12-23 16:38:32', '2023-12-23 16:38:32'),
(3, 'hi@gmail.com', '2023-12-23 16:38:44', '2023-12-23 16:38:44'),
(4, 'hiuda@gmail.com', '2023-12-25 09:42:15', '2023-12-25 09:42:15');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
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
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Amman', '2023-12-23 16:20:46', '2023-12-23 16:20:46'),
(2, 'Irbid', '2023-12-23 16:20:46', '2023-12-23 16:20:46'),
(3, 'Zarqa\'a', '2023-12-23 16:20:46', '2023-12-23 16:20:46'),
(4, 'Aqaba', '2023-12-23 16:20:46', '2023-12-23 16:20:46'),
(5, 'Salt', '2023-12-23 16:20:46', '2023-12-23 16:20:46');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(98, '2014_09_20_004111_create_roles_table', 1),
(99, '2014_10_12_000000_create_users_table', 1),
(100, '2014_10_12_100000_create_password_resets_table', 1),
(101, '2019_08_19_000000_create_failed_jobs_table', 1),
(102, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(103, '2023_11_22_212654_create_brands_table', 1),
(104, '2023_11_23_110509_create_locations_table', 1),
(105, '2023_11_23_201358_create_cars_table', 1),
(106, '2023_11_23_204226_create_drivers_table', 1),
(107, '2023_11_24_084517_create_rents_table', 1),
(108, '2023_11_24_221237_create_reviews_table', 1),
(109, '2023_12_05_174615_create_comments_table', 1),
(110, '2023_12_09_214958_create_rejects_table', 1),
(111, '2023_12_10_113808_create_emails_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 3, 'sanctum-token', 'f04783f1696077939f9ca274e25901723d6287f0c01dae87da5a4dac5ec2eed6', '[\"*\"]', NULL, NULL, '2023-12-23 16:46:22', '2023-12-23 16:46:22'),
(2, 'App\\Models\\User', 1, 'sanctum-token', '0597fcfabfa3c6b2247cf86ebddd7202aad16a6edaa3657197d87ba3443feef7', '[\"*\"]', NULL, NULL, '2023-12-23 17:11:01', '2023-12-23 17:11:01'),
(3, 'App\\Models\\User', 1, 'sanctum-token', 'b790d9a2776de515b907aced013484fd2e4802cb724797ffa8e0e023d3f42fd5', '[\"*\"]', NULL, NULL, '2023-12-23 17:11:54', '2023-12-23 17:11:54'),
(4, 'App\\Models\\User', 4, 'sanctum-token', '32d9f5b7f945eb5b174da75017142008b5b2396b9fe971ae2f464629924770c9', '[\"*\"]', NULL, NULL, '2023-12-23 17:33:37', '2023-12-23 17:33:37'),
(5, 'App\\Models\\User', 4, 'sanctum-token', '916671db6dc268b8317e7b76cb37f46879a826fae998e0ddb4d501dba28a2776', '[\"*\"]', NULL, NULL, '2023-12-23 17:36:03', '2023-12-23 17:36:03'),
(6, 'App\\Models\\User', 4, 'sanctum-token', 'c28e0cb6a88a76ca06f91a0278cc2c93a7af35d2f327e8b502e2831c66ebe7e9', '[\"*\"]', NULL, NULL, '2023-12-23 17:36:40', '2023-12-23 17:36:40'),
(7, 'App\\Models\\User', 7, 'sanctum-token', '0e676eff2a5151ff6b7a96d738ebd0666d6379e30811c7c65ce115877b1f9f92', '[\"*\"]', NULL, NULL, '2023-12-23 17:39:52', '2023-12-23 17:39:52'),
(8, 'App\\Models\\User', 4, 'sanctum-token', '58cfe129ddc9e7cab6499a44483b56c7da0aa694c0c9d13c5159b9695e3651bf', '[\"*\"]', NULL, NULL, '2023-12-23 17:40:34', '2023-12-23 17:40:34'),
(9, 'App\\Models\\User', 7, 'sanctum-token', 'd6431da205c21c5979483422ee62a1f3939f61b4db378cc1723f8ac38f00ef72', '[\"*\"]', NULL, NULL, '2023-12-23 17:40:57', '2023-12-23 17:40:57'),
(10, 'App\\Models\\User', 1, 'sanctum-token', 'cfbd14cd855d22473d8b09dff0ccf7f721ba82a73b0df4f787d41705b8a48e42', '[\"*\"]', NULL, NULL, '2023-12-23 19:13:59', '2023-12-23 19:13:59'),
(11, 'App\\Models\\User', 2, 'sanctum-token', '6d680632af71a4820ed4d5d06ee4350faf9f04fa9d8f389237dd7ceda11c6a21', '[\"*\"]', NULL, NULL, '2023-12-24 12:42:35', '2023-12-24 12:42:35'),
(12, 'App\\Models\\User', 1, 'sanctum-token', '138f887033df8bcb7ee1467fec5db8f822e9a4511a9fca96d8f5a4a347df87c5', '[\"*\"]', NULL, NULL, '2023-12-24 12:43:46', '2023-12-24 12:43:46'),
(13, 'App\\Models\\User', 1, 'sanctum-token', 'c790e4c959c5583b603de074e24e3d07e6036cea29c158f646b254b77acde373', '[\"*\"]', NULL, NULL, '2023-12-24 13:57:35', '2023-12-24 13:57:35'),
(14, 'App\\Models\\User', 2, 'sanctum-token', '73b000179d4425736f3bc74fff81be9563efcb87d619c56f8b6b7c548aee770c', '[\"*\"]', NULL, NULL, '2023-12-24 14:37:23', '2023-12-24 14:37:23'),
(15, 'App\\Models\\User', 1, 'sanctum-token', 'e05ba4cf6ef83f31f5f176746264ad039be0b390588cc962973cac30a9bc48a2', '[\"*\"]', NULL, NULL, '2023-12-24 14:44:23', '2023-12-24 14:44:23'),
(16, 'App\\Models\\User', 2, 'sanctum-token', 'fbe6643478141eb576181db4ee04871575fcc85838c8329533fdacb4a38eeb23', '[\"*\"]', NULL, NULL, '2023-12-24 15:01:08', '2023-12-24 15:01:08'),
(17, 'App\\Models\\User', 2, 'sanctum-token', 'a16c3af8f5978f058e14210f02e6d4b370310e79fc11cada168857e3248c1a7e', '[\"*\"]', NULL, NULL, '2023-12-24 15:05:07', '2023-12-24 15:05:07'),
(18, 'App\\Models\\User', 2, 'sanctum-token', '41d02e62b98c59e09b7b6a146e718d5f440866dee6757ab447ea7959261886b7', '[\"*\"]', NULL, NULL, '2023-12-24 15:06:34', '2023-12-24 15:06:34'),
(19, 'App\\Models\\User', 2, 'sanctum-token', '52b38c7a49ea8848b7681444ad9ec50051489d1c7a041fe1105bac03e87e3d45', '[\"*\"]', NULL, NULL, '2023-12-24 15:06:59', '2023-12-24 15:06:59'),
(20, 'App\\Models\\User', 2, 'sanctum-token', '3b18af5e7c689e1be82c911c1f37048d35663539b48cec30f20a292155068de2', '[\"*\"]', NULL, NULL, '2023-12-24 15:09:14', '2023-12-24 15:09:14'),
(21, 'App\\Models\\User', 2, 'sanctum-token', 'b3555235b75779894c600311cb6c3bf906f2027b2371f63042bca3939e6c29ba', '[\"*\"]', NULL, NULL, '2023-12-24 15:09:45', '2023-12-24 15:09:45'),
(22, 'App\\Models\\User', 7, 'sanctum-token', '081b32f9452fa496f6ec6bcc30637f17cd6a768c40a7450aa252c4f4b1cfdd05', '[\"*\"]', NULL, NULL, '2023-12-25 06:34:05', '2023-12-25 06:34:05'),
(23, 'App\\Models\\User', 7, 'sanctum-token', '52792240ccf26f11c470c299beed600eee2606cea8414e3301f172b656989b49', '[\"*\"]', NULL, NULL, '2023-12-25 06:35:10', '2023-12-25 06:35:10'),
(24, 'App\\Models\\User', 4, 'sanctum-token', '8c4a6b01567dd9ee38e7856f08620bda5749b6c1d5604842ced363c350bd3300', '[\"*\"]', NULL, NULL, '2023-12-25 06:35:53', '2023-12-25 06:35:53'),
(25, 'App\\Models\\User', 7, 'sanctum-token', '95e7f9c74a0671af00cabaae7ebf96fe4c35653c79670a9fd5fc7a31d1dc261e', '[\"*\"]', NULL, NULL, '2023-12-25 06:36:27', '2023-12-25 06:36:27'),
(26, 'App\\Models\\User', 1, 'sanctum-token', '72ef16321a260cf945c49e450a8f9470b04416237087865889509affe70e523c', '[\"*\"]', NULL, NULL, '2023-12-25 06:42:28', '2023-12-25 06:42:28'),
(27, 'App\\Models\\User', 4, 'sanctum-token', 'cde9c102036e5e360e9690b391b5a92e0c9e2b0d2baa3fe2b63b3378349e1ca6', '[\"*\"]', NULL, NULL, '2023-12-25 06:44:17', '2023-12-25 06:44:17'),
(28, 'App\\Models\\User', 2, 'sanctum-token', '83c7ae4e60694c8ab75c42de2c1a3b900512ed65f2abcb0c6a3fd4e96ec2b7d4', '[\"*\"]', NULL, NULL, '2023-12-25 08:29:14', '2023-12-25 08:29:14'),
(29, 'App\\Models\\User', 1, 'sanctum-token', '519c0313d734393dcaedc51c755db7bb93edc3805f1e65f02a0e3af3be04ae80', '[\"*\"]', NULL, NULL, '2023-12-25 08:30:30', '2023-12-25 08:30:30'),
(30, 'App\\Models\\User', 2, 'sanctum-token', '82443c84de335a9eebd1e9418d201e9d6a604deb78aec3c74c384c7e7edf30e0', '[\"*\"]', NULL, NULL, '2023-12-25 08:31:16', '2023-12-25 08:31:16'),
(31, 'App\\Models\\User', 2, 'sanctum-token', '025fd54c9909cfa936830313de17c7cc628cc7e9fcb1d9a1dea2507d82cc2e72', '[\"*\"]', NULL, NULL, '2023-12-25 08:32:12', '2023-12-25 08:32:12'),
(32, 'App\\Models\\User', 7, 'sanctum-token', 'b03bea3d8bae9e74e8220a2c6483ac31187c9df98c189b602da5c84adff6d13b', '[\"*\"]', NULL, NULL, '2023-12-25 08:32:56', '2023-12-25 08:32:56'),
(33, 'App\\Models\\User', 7, 'sanctum-token', '048427d523457fe60eeee9a58e07dd59eac3ca9cd40251adc18275ab5e4a28d0', '[\"*\"]', NULL, NULL, '2023-12-25 08:35:35', '2023-12-25 08:35:35'),
(34, 'App\\Models\\User', 1, 'sanctum-token', 'a24413d9d93a756f28c20e5962bce100133f6ea5091af34605b0301f226ab9ce', '[\"*\"]', NULL, NULL, '2023-12-25 08:42:05', '2023-12-25 08:42:05'),
(35, 'App\\Models\\User', 7, 'sanctum-token', '8c20e9c03a63a68a13920fe775c74774862b6d9d67befbf9cfffb6ea57d76ffa', '[\"*\"]', NULL, NULL, '2023-12-25 09:01:36', '2023-12-25 09:01:36'),
(36, 'App\\Models\\User', 2, 'sanctum-token', '11e23659ad8b2c5ab4602394cff0b1020f1a0df5799a54d3f65e05cf8f495995', '[\"*\"]', NULL, NULL, '2023-12-25 09:40:57', '2023-12-25 09:40:57'),
(37, 'App\\Models\\User', 7, 'sanctum-token', '2c2cf82bb8ee8c4d75288dfd97b08c9ead12d30b0259cb830662c2e772430545', '[\"*\"]', NULL, NULL, '2023-12-25 09:47:09', '2023-12-25 09:47:09'),
(38, 'App\\Models\\User', 2, 'sanctum-token', 'bfa645b383bea65dc93a786641788a55687ed3911ceae6d273a42d2a4d57f2f8', '[\"*\"]', NULL, NULL, '2023-12-25 09:57:00', '2023-12-25 09:57:00'),
(39, 'App\\Models\\User', 1, 'sanctum-token', 'de47a001439bb4c94c030d7b3fa1300e85a2f06e5c90547a195a343eeadda4fe', '[\"*\"]', NULL, NULL, '2023-12-25 10:04:43', '2023-12-25 10:04:43'),
(40, 'App\\Models\\User', 2, 'sanctum-token', '3ff4fcf08b5ab4282558f6c5c6e55d62b351a8cfe92ca89ff56deebe16e2e6cf', '[\"*\"]', NULL, NULL, '2023-12-25 10:06:06', '2023-12-25 10:06:06'),
(41, 'App\\Models\\User', 7, 'sanctum-token', '218c045994bc7e984ac527634f85b2a0a724f25509ec69f9b785d2d44fc4bcb7', '[\"*\"]', NULL, NULL, '2023-12-25 10:07:11', '2023-12-25 10:07:11'),
(42, 'App\\Models\\User', 4, 'sanctum-token', 'd664c9a3372efea94126aa8c0469e77a217014f685f667af3586049be20069a4', '[\"*\"]', NULL, NULL, '2023-12-25 10:10:54', '2023-12-25 10:10:54'),
(43, 'App\\Models\\User', 1, 'sanctum-token', '4a87ede982ef1139a27c731a2aba26460be44a353b7da3833a1b78c7ed09fc92', '[\"*\"]', NULL, NULL, '2023-12-25 10:11:16', '2023-12-25 10:11:16'),
(44, 'App\\Models\\User', 3, 'sanctum-token', 'a31d03241fb84d39f3daa4f09ce5449bf768ebe3aa868cebafaf0137468492cf', '[\"*\"]', NULL, NULL, '2023-12-25 11:46:16', '2023-12-25 11:46:16'),
(45, 'App\\Models\\User', 1, 'sanctum-token', 'aafc748d32148b78175785a9a7b7bb491e573988d6a61b38fc1eaa014fe34e59', '[\"*\"]', NULL, NULL, '2023-12-25 12:11:58', '2023-12-25 12:11:58'),
(46, 'App\\Models\\User', 52, 'apiToken', 'f24b4ccae0e2fc1a5b183774137026f7a39404d76d8b84e780ba9783657b6197', '[\"*\"]', NULL, NULL, '2023-12-25 13:10:27', '2023-12-25 13:10:27');

-- --------------------------------------------------------

--
-- Table structure for table `rejects`
--

CREATE TABLE `rejects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `car_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rents`
--

CREATE TABLE `rents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `car_id` bigint(20) UNSIGNED NOT NULL,
  `total_price` double(8,2) NOT NULL,
  `accept` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rents`
--

INSERT INTO `rents` (`id`, `start`, `end`, `user_id`, `car_id`, `total_price`, `accept`, `created_at`, `updated_at`) VALUES
(8, '2023-12-25 00:00:00', '2023-12-26 00:00:00', 14, 14, 270.00, 1, '2023-12-25 12:27:52', '2023-12-25 12:27:52'),
(9, '2023-12-27 00:00:00', '2023-12-29 00:00:00', 28, 12, 105.00, 1, '2023-12-20 12:28:15', '2023-12-25 12:28:15'),
(10, '2023-12-25 00:00:00', '2023-12-25 00:00:00', 31, 5, 35.00, 1, '2023-12-18 12:28:58', '2023-12-25 12:28:58'),
(11, '2023-12-25 00:00:00', '2023-12-25 00:00:00', 30, 12, 35.00, 1, '2023-12-17 12:29:22', '2023-12-25 12:29:22'),
(12, '2023-12-25 00:00:00', '2023-12-28 00:00:00', 32, 25, 220.00, 1, '2023-12-21 12:29:50', '2023-12-25 12:29:50'),
(13, '2023-12-26 00:00:00', '2023-12-28 00:00:00', 10, 5, 105.00, 1, '2023-12-25 12:35:45', '2023-12-25 12:35:45'),
(14, '2023-12-25 00:00:00', '2023-12-26 00:00:00', 13, 6, 140.00, 1, '2023-12-25 12:37:32', '2023-12-25 12:37:32'),
(15, '2024-01-03 00:00:00', '2024-01-04 00:00:00', 17, 8, 90.00, 1, '2023-12-25 12:38:36', '2023-12-25 12:38:36'),
(16, '2023-12-28 00:00:00', '2023-12-29 00:00:00', 18, 7, 160.00, 1, '2023-12-25 12:41:38', '2023-12-25 12:41:38'),
(17, '2023-12-25 00:00:00', '2023-12-27 00:00:00', 7, 15, 1500.00, 1, '2023-12-22 12:44:21', '2023-12-25 12:44:21'),
(18, '2023-12-26 00:00:00', '2023-12-26 00:00:00', 27, 12, 35.00, 1, '2023-12-25 12:47:22', '2023-12-25 12:47:22'),
(19, '2023-12-25 00:00:00', '2023-12-28 00:00:00', 7, 26, 140.00, 1, '2023-12-19 12:51:24', '2023-12-25 12:51:24'),
(20, '2023-12-27 00:00:00', '2023-12-29 00:00:00', 52, 11, 45.00, 1, '2023-12-25 13:11:01', '2023-12-25 13:12:50');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `rent_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `rating`, `rent_id`, `created_at`, `updated_at`) VALUES
(3, 5, 8, '2023-12-25 12:34:00', '2023-12-25 12:34:26'),
(4, 5, 13, '2023-12-25 12:38:43', '2023-12-25 12:38:43'),
(5, 4, 14, '2023-12-25 12:38:44', '2023-12-25 12:38:49'),
(6, 3, 15, '2023-12-25 12:41:46', '2023-12-25 12:41:46'),
(7, 4, 16, '2023-12-25 12:43:02', '2023-12-25 12:43:02'),
(8, 4, 17, '2023-12-25 12:44:56', '2023-12-25 12:44:56'),
(9, 5, 9, '2023-12-25 12:34:00', '2023-12-25 12:34:26'),
(10, 4, 18, '2023-12-25 12:49:47', '2023-12-25 12:49:47'),
(11, 4, 20, '2023-12-25 13:13:04', '2023-12-25 13:13:49');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2023-12-23 16:20:46', '2023-12-23 16:20:46'),
(2, 'landlord', '2023-12-23 16:20:46', '2023-12-23 16:20:46'),
(3, 'renter', '2023-12-23 16:20:46', '2023-12-23 16:20:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `phone`, `img`, `role_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test Admin', 'admin@example.com', '2023-12-23 16:20:47', '$2y$10$aVIJJbL8bV6dGYNeMpAqpuUeE0YWAnmDIWyzFdUorDMy8nyqB0dSO', '0777777777', NULL, 1, 'n9uS7WTfm5', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(2, 'hey hello', 'icie.walter@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '1-201-355-6506', '1703448483.svg', 2, 'UmSiHe44I6', '2023-12-23 16:20:47', '2023-12-24 17:08:03'),
(3, 'Albina Gutkowski', 'neal50@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-283-801-9060', NULL, 2, 'ZsHi4iTYPH', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(4, 'Bethel Koelpin how are you', 'pagac.eduardo@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1.940.882.1461', '1703363775.jpg', 2, 'qvvWDiDH9x', '2023-12-23 16:20:47', '2023-12-23 17:36:55'),
(5, 'Chad Bauch III', 'pierre18@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-916-204-5656', NULL, 2, 'Q0Ban8AQTg', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(6, 'Guy Schinner', 'keenan.friesen@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(469) 926-8135', NULL, 2, 'VegfnScpn3', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(7, 'Mr Gianni McGlynn', 'whitney23@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1.757.398.3960', '1703366423.png', 3, 'iO0tmrW3R3', '2023-12-23 16:20:47', '2023-12-23 18:20:23'),
(8, 'Thad Hermann', 'wade.greenholt@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '678.499.3202', NULL, 2, '3R1N5VkMVp', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(9, 'Oma Leuschke', 'homenick.norene@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-803-237-5298', NULL, 2, 'VhW5zsSREp', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(10, 'Prof. Judy Adams', 'lreichel@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '878-603-2689', NULL, 3, '2OHWA1hspA', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(11, 'Ima Nikolaus', 'tressa57@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(307) 788-3610', NULL, 2, 'zMGvtzO0T4', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(12, 'Dr. Delphine Larson', 'itoy@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '773-858-0487', NULL, 3, 'fGRVY8NBMy', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(13, 'Euna Ankunding', 'alize.hane@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '410-820-8829', NULL, 3, 'MZrZQIvzXs', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(14, 'Jessie Nitzsche', 'mlehner@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-952-999-5877', NULL, 3, 's0XwUGrURY', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(15, 'Keeley Gerhold', 'jasper.jenkins@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '310-389-5159', NULL, 2, '9PY8QqknV2', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(16, 'Alaina Kling', 'tstracke@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-239-378-5298', NULL, 3, 'KZnLrqcX4w', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(17, 'Dr. Janis Davis DDS', 'hickle.randall@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1 (580) 266-5890', NULL, 3, 'zKbhDAmsOV', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(18, 'Maryam Morar', 'madalyn49@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '731-203-8176', NULL, 3, 'EgZoINUjsQ', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(19, 'Ada Mueller DVM', 'isaiah.steuber@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-586-542-4687', NULL, 2, 'vyH5YAr1mD', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(20, 'Irving Kulas', 'qrice@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+12814660487', NULL, 2, 'SeoqQJ70X8', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(21, 'Brittany Feest', 'nayeli94@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '770.946.2449', NULL, 2, 'lk8lRmqr8Z', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(22, 'Dixie Schumm I', 'hgerlach@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-520-653-6873', NULL, 2, 'X7qnRxHokM', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(23, 'Norris Kassulke', 'nskiles@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '1-563-293-7607', NULL, 2, 'WFVY1WsQTJ', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(24, 'Arvel Ruecker', 'deshawn.ebert@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(820) 571-9443', NULL, 2, 'yL8QKMMpqS', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(25, 'Julien Bailey Jr.', 'clarissa.schiller@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1 (470) 265-5822', NULL, 2, 'QT9HVR4WCQ', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(26, 'Adalberto Klein', 'alexandrea.larkin@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '774.401.8177', NULL, 2, 'A3C5tl3Q87', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(27, 'Kaley Lynch', 'shanon.tillman@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '360-622-3923', NULL, 3, 'ZLS6BF4pSl', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(28, 'Mr. Kurt Keebler V', 'vandervort.lenore@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '480-961-6857', NULL, 3, 'chPTMOSq3J', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(29, 'Jonatan Torp', 'xleannon@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-484-485-0161', NULL, 3, '6Z8DLYGeHx', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(30, 'Mrs. Madge Sipes', 'thiel.ottis@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-918-739-2158', NULL, 3, 'cHlNTwOSMy', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(31, 'Sammy Gibson', 'percy23@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(201) 881-4826', NULL, 3, 'iaunKCsRHw', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(32, 'Tatyana Davis', 'tatyana.sanford@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(417) 460-5137', NULL, 3, '5NRag028Yu', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(33, 'Violette Hayes', 'akeem.abbott@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '832.868.3003', NULL, 3, 'EUqsAxvIgf', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(34, 'Gabrielle Funk', 'camille.conroy@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(281) 693-5585', NULL, 3, 'iCl8O4CUgK', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(35, 'Miss Carissa Simonis DVM', 'nolan.adonis@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-561-729-4164', NULL, 3, 'OxplwLdG7O', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(36, 'Emile Wuckert', 'abailey@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-325-671-0707', NULL, 2, 'LIJeQ7NroI', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(37, 'Prof. Karley Terry I', 'ellsworth70@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-937-676-3350', NULL, 3, 'HfdliLzx2E', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(38, 'Ruthe Gerlach MD', 'terence74@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '1-380-262-2963', NULL, 2, 'wFxinCBYzi', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(39, 'Zita Rau Sr.', 'hvolkman@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '630.665.0316', NULL, 2, 'tVhY6dkwvE', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(40, 'Margaretta Schuppe', 'ritchie.eula@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '336.287.7789', NULL, 2, 'imI4vsE1fY', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(41, 'Evalyn Goyette', 'witting.dolly@example.net', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '820-843-1068', NULL, 2, 'aOjQpI6Og3', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(42, 'Quentin Hickle', 'uriel.satterfield@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1.949.733.3850', NULL, 2, 'ZcTUxvvo2H', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(43, 'Lenora Abbott', 'rodolfo.mcclure@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '413-436-0412', NULL, 3, 'jOm4sjOdBU', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(44, 'Dr. Lia Torp', 'tluettgen@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '1-606-439-2481', NULL, 2, 'NrwYu8uWRc', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(45, 'Cristopher Ullrich DVM', 'labadie.precious@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '615.944.6986', NULL, 2, 'kOM48Y7p3z', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(46, 'Prof. Fredrick Green MD', 'csimonis@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '385.938.9596', NULL, 3, '54PR9dZtK8', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(47, 'Bart Roberts', 'darius62@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1 (463) 476-1716', NULL, 2, 'X22T0mZtrY', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(48, 'Noemi Greenfelder', 'zbeer@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-848-989-1866', NULL, 2, 'qVNGGzubXl', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(49, 'Wanda Jerde', 'alvina39@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '781.324.9292', NULL, 2, 'tb8HTeDonI', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(50, 'Prof. Esteban Mayert', 'abby35@example.org', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(681) 999-6109', NULL, 3, 'kJMI4h8HSQ', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(51, 'Clair Vandervort Sr.', 'stefanie75@example.com', '2023-12-23 16:20:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '352.335.1650', NULL, 2, 'EqdbNl07gx', '2023-12-23 16:20:47', '2023-12-23 16:20:47'),
(52, 'ahmad hosam', 'hosammansour@gmail.com', NULL, '$2y$10$zGv4Uh9aeSZ1..4N6/BkNey2avk1CiQ5NO9rnzjLNfv6OpdQNO6ay', '0789671075', NULL, 3, NULL, '2023-12-25 13:10:27', '2023-12-25 13:10:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brands_name_unique` (`name`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cars_location_id_foreign` (`location_id`),
  ADD KEY `cars_brand_id_foreign` (`brand_id`),
  ADD KEY `cars_owner_id_foreign` (`owner_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_user_id_foreign` (`user_id`),
  ADD KEY `comments_car_id_foreign` (`car_id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `drivers_user_id_foreign` (`user_id`);

--
-- Indexes for table `emails`
--
ALTER TABLE `emails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `locations_name_unique` (`name`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `rejects`
--
ALTER TABLE `rejects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rejects_user_id_foreign` (`user_id`),
  ADD KEY `rejects_car_id_foreign` (`car_id`);

--
-- Indexes for table `rents`
--
ALTER TABLE `rents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rents_user_id_foreign` (`user_id`),
  ADD KEY `rents_car_id_foreign` (`car_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_rent_id_foreign` (`rent_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `emails`
--
ALTER TABLE `emails`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `rejects`
--
ALTER TABLE `rejects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rents`
--
ALTER TABLE `rents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cars_location_id_foreign` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cars_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_car_id_foreign` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `drivers`
--
ALTER TABLE `drivers`
  ADD CONSTRAINT `drivers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rejects`
--
ALTER TABLE `rejects`
  ADD CONSTRAINT `rejects_car_id_foreign` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rejects_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rents`
--
ALTER TABLE `rents`
  ADD CONSTRAINT `rents_car_id_foreign` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rents_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_rent_id_foreign` FOREIGN KEY (`rent_id`) REFERENCES `rents` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
