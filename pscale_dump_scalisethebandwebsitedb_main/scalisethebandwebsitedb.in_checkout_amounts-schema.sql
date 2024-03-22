CREATE TABLE `in_checkout_amounts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `stripe_checkout_id` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_size_index_checkouts` (`product_id`,`size`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
