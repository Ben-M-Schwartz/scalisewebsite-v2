CREATE TABLE `stockNotifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `notificationIndex` (`product_id`,`size`),
  KEY `subIndex` (`email`,`product_id`,`size`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
