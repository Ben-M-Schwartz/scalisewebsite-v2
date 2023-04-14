CREATE TABLE `potential_subscribers` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(255),
	`token` varchar(255)
);
