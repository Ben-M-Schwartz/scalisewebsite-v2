CREATE TABLE `cart_items` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`cart_id` int NOT NULL,
	`product_id` int NOT NULL,
	`size` varchar(255),
	`quantity` int
);

CREATE TABLE `carts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(255),
	`total_price` decimal(10,2),
	`total_weight` decimal(10,2)
);

CREATE TABLE `product_details` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255),
	`price` decimal(10,2),
	`image_path` varchar(255),
	`weight` decimal(10,2)
);

CREATE TABLE `product_quantity` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`product_id` int NOT NULL,
	`size` varchar(255),
	`quantity` int
);

CREATE TABLE `subscribers` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(255)
);

ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_cart_id_carts_id_fk` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`);
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_product_id_product_details_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product_details`(`id`);
ALTER TABLE `product_quantity` ADD CONSTRAINT `product_quantity_product_id_product_details_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product_details`(`id`);
CREATE INDEX `cart_items__cart_id__idx` ON `cart_items` (`cart_id`);
CREATE INDEX `cart_items__product_id__idx` ON `cart_items` (`product_id`);
CREATE INDEX `carts__user_id__idx` ON `carts` (`user_id`);
CREATE INDEX `product_details__name__idx` ON `product_details` (`name`);
CREATE INDEX `product_details__price__idx` ON `product_details` (`price`);
CREATE INDEX `product_details__weight__idx` ON `product_details` (`weight`);
CREATE INDEX `product_quantity__product_id__idx` ON `product_quantity` (`product_id`);