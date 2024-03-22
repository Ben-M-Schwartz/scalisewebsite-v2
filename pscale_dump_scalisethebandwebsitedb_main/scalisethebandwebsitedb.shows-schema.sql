CREATE TABLE `shows` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `bandsintown_link` varchar(5000) DEFAULT NULL,
  `ticket_link` varchar(5000) DEFAULT NULL,
  `maps_link` varchar(255) DEFAULT NULL,
  `free` tinyint(1) DEFAULT NULL,
  `ticket_button_text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `showIndex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
