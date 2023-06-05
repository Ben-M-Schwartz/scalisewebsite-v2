ALTER TABLE `carts` ALTER COLUMN `updated_at` SET DEFAULT (now());
ALTER TABLE `orders` ADD `shipped` boolean DEFAULT false;