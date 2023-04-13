ALTER TABLE `cart_items` MODIFY COLUMN `cart_id` int;
ALTER TABLE `cart_items` MODIFY COLUMN `product_id` int;
ALTER TABLE `product_quantity` MODIFY COLUMN `product_id` int;
ALTER TABLE `cart_items` DROP FOREIGN KEY `cart_items_cart_id_carts_id_fk`;

ALTER TABLE `cart_items` DROP FOREIGN KEY `cart_items_product_id_product_details_id_fk`;

ALTER TABLE `product_quantity` DROP FOREIGN KEY `product_quantity_product_id_product_details_id_fk`;
