CREATE TABLE `shows` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`date` varchar(255),
	`time` varchar(255),
	`location` varchar(255),
	`name` varchar(255),
	`bandsintown_link` varchar(2000),
	`ticket_link` varchar(2000)
);
