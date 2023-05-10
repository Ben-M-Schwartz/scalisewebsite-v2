CREATE TABLE `notifiedAlreadySubscribed` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(255)
);

CREATE INDEX `notified_index` ON `notifiedAlreadySubscribed` (`email`);
CREATE INDEX `subIndex` ON `stockNotifications` (`email`,`product_id`,`size`);
CREATE INDEX `subscribed_index` ON `subscribers` (`email`);