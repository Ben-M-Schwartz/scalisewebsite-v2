ALTER TABLE `carts` MODIFY COLUMN `id` varchar(32) NOT NULL;
ALTER TABLE `cart_items` ADD `price` decimal(10,2);
ALTER TABLE `cart_items` ADD `weight` decimal(10,2);
ALTER TABLE `product_details` ADD `sizes` varchar(255);
ALTER TABLE `carts` DROP COLUMN `user_id`;
DROP INDEX `carts__user_id__idx` ON `carts`;
DROP INDEX `product_details__weight__idx` ON `product_details`;
CREATE INDEX `carts__id__idx` ON `carts` (`id`);