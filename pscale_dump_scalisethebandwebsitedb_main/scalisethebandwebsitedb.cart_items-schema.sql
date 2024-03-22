CREATE TABLE `cart_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` varchar(32) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `cart_items__cart_id__idx` (`cart_id`),
  KEY `product_id_size_cart_id_index` (`product_id`,`size`,`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
