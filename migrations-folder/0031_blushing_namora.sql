CREATE TABLE `cart_items` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`cart_id` varchar(32),
	`product_id` int,
	`size` varchar(255),
	`quantity` int,
	`price` double(10,2),
	`weight` float,
	`item_name` varchar(255),
	`image` varchar(255)
);

CREATE TABLE `carts` (
	`id` varchar(32) PRIMARY KEY NOT NULL,
	`total_price` double(10,2),
	`total_weight` float
);

CREATE TABLE `in_checkout_amounts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`product_id` int,
	`stripe_checkout_id` varchar(255),
	`size` varchar(255),
	`quantity` int
);

CREATE TABLE `orders` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`item` varchar(255),
	`size` varchar(255),
	`quantity` int,
	`customer_name` varchar(255),
	`customer_email` varchar(255),
	`customer_phone` varchar(255),
	`customer_city` varchar(255),
	`customer_state` varchar(255),
	`customer_zip` varchar(255),
	`customer_country` varchar(255),
	`customer_addressLine1` varchar(255),
	`customer_addressLine2` varchar(255),
	`stripe_checkout_session_id` varchar(255),
	`payment_intent_id` varchar(255),
	`payment_status` varchar(255)
);

CREATE TABLE `potential_subscribers` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(255),
	`token` varchar(255)
);

CREATE TABLE `product_details` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255),
	`price` double(10,2),
	`image_path` varchar(255),
	`weight` float
);

CREATE TABLE `product_quantity` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`product_id` int,
	`size` varchar(255),
	`quantity` int
);

CREATE TABLE `shows` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`date` varchar(255),
	`time` varchar(255),
	`location` varchar(255),
	`name` varchar(255),
	`bandsintown_link` varchar(255),
	`ticket_link` varchar(255)
);

CREATE TABLE `stockNotifications` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(255),
	`product_id` int,
	`size` varchar(255)
);

CREATE TABLE `subscribers` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(255)
);

CREATE INDEX `cart_items__cart_id__idx` ON `cart_items` (`cart_id`);
CREATE INDEX `product_id_size_cart_id_index` ON `cart_items` (`product_id`,`size`,`cart_id`);
CREATE INDEX `cart_id_index` ON `carts` (`id`);
CREATE INDEX `id_size_index_checkouts` ON `in_checkout_amounts` (`product_id`,`size`);
CREATE INDEX `subscriber_index` ON `potential_subscribers` (`token`);
CREATE INDEX `productDetails_id_index` ON `product_details` (`id`);
CREATE INDEX `product_name_index` ON `product_details` (`name`);
CREATE INDEX `id_size_index_inventory` ON `product_quantity` (`product_id`,`size`);
CREATE INDEX `showIndex` ON `shows` (`id`);
CREATE INDEX `notificationIndex` ON `stockNotifications` (`product_id`,`size`);