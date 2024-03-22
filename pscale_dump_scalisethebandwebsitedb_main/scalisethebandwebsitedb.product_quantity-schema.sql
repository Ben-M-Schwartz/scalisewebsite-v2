CREATE TABLE `product_quantity` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_size_index_inventory` (`product_id`,`size`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
