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
	`payment` varchar(255)
);
