CREATE TABLE `product_details` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `is_taxed` int DEFAULT NULL,
  `store_order` int DEFAULT NULL,
  `sale_price` double(10,2) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `productDetails_id_index` (`id`),
  KEY `product_name_index` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
