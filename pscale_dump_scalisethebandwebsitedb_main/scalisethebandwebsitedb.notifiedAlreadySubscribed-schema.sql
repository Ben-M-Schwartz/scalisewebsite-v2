CREATE TABLE `notifiedAlreadySubscribed` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `notified_index` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
