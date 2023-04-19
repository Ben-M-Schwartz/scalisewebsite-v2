CREATE TABLE `in_cart_amounts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`product_id` int,
	`stripe_checkout_id` varchar(255),
	`size` varchar(255),
	`quantity` int
);
