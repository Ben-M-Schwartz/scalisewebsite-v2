CREATE TABLE `stockNotifications` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(255),
	`product_id` int,
	`size` varchar(255)
);

ALTER TABLE `orders` ADD `payment_status` varchar(255);
ALTER TABLE `orders` DROP COLUMN `payment`;