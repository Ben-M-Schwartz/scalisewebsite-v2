//drizzle implementation
import { mysqlTable, int, decimal, varchar, foreignKey, uniqueIndex, index, serial } from 'drizzle-orm/mysql-core';

export const product_details = mysqlTable(
  'product_details',
  {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }),
    price: decimal('price', { precision: 10, scale: 2 }),
    image_path: varchar('image_path', { length: 255 }),
    weight: decimal('weight', { precision: 10, scale: 2 })
  },
  table => ({
    idIndex: index('product_details__name__idx').on(table.id),
    nameIndex: index('product_details__name__idx').on(table.name),
    priceIndex: index('product_details__price__idx').on(table.price),
    weightIndex: index('product_details__weight__idx').on(table.weight)
  })
);

export const product_quantity = mysqlTable(
  'product_quantity',
  {
    id: serial('id').primaryKey().notNull(),
    product_id: int('product_id').references(() => product_details.id).notNull(),
    size: varchar('size', { length: 255 }),
    quantity: int('quantity')
  },
  product_quantity => ({
    productIdIndex: index('product_quantity__product_id__idx').on(product_quantity.product_id),
    productIdFK: foreignKey(({
        columns: [product_quantity.product_id],
        foreignColumns: [product_details.id],
      })),
  })
);

export const carts = mysqlTable(
  'carts',
  {
    id: serial('id').primaryKey().notNull(),
    user_id: varchar('user_id', { length: 255 }),
    total_price: decimal('total_price', { precision: 10, scale: 2 }),
    total_weight: decimal('total_weight', { precision: 10, scale: 2 })
  },
  table => ({
    userIdIndex: index('carts__user_id__idx').on(table.user_id)
  })
);

export const cart_items = mysqlTable(
    'cart_items',
    {
      id: serial('id').primaryKey().notNull(),
      cart_id: int('cart_id').references(() => carts.id).notNull(),
      product_id: int('product_id').references(() => product_details.id).notNull(),
      size: varchar('size', { length: 255 }),
      quantity: int('quantity')
    },
    cart_items => ({
      cartIdIndex: index('cart_items__cart_id__idx').on(cart_items.cart_id),
      productIdIndex: index('cart_items__product_id__idx').on(cart_items.product_id),
      cartIdFK: foreignKey(({
          columns: [cart_items.cart_id],
          foreignColumns: [carts.id]
      })),
      productIdFK: foreignKey(({
          columns: [cart_items.product_id],
          foreignColumns: [product_details.id]
      })),
    })
  );

export const subscribers = mysqlTable(
  'subscribers',
  {
    id: serial('id').primaryKey().notNull(),
    email: varchar('email', { length: 255 })
  }
);




/* 
@planetscale/database implementation
might work who knows I haven't tested it

import connection from './db'

export const createTables = async () => {
    const productDetailsTableExists = await connection
        .execute('SELECT 1 FROM `product_details` LIMIT 1')
        .then(() => true)
        .catch(() => false);

    if(!productDetailsTableExists){
        await connection.execute(`CREATE TABLE product_details (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255),
            price DECIMAL(10,2),
            image_path VARCHAR(255),
            weight DECIMAL(10,2),
            INDEX(name),
            INDEX(price),
            INDEX(weight)
        );`)
    }

    const productQuantityTableExists = await connection
        .execute('SELECT 1 FROM `product_quantity` LIMIT 1')
        .then(() => true)
        .catch(() => false);
    if(!productQuantityTableExists){
        await connection.execute(`CREATE TABLE product_quantity (
            id INT PRIMARY KEY AUTO_INCREMENT,
            product_id INT,
            size VARCHAR(255),
            quantity INT,
            FOREIGN KEY (product_id) REFERENCES product_details(id),
            INDEX(product_id)
        );`)
    }

    const cartTableExists = await connection
        .execute('SELECT 1 FROM `carts` LIMIT 1')
        .then(() => true)
        .catch(() => false);
    if(!cartTableExists){
        await connection.execute(`CREATE TABLE carts (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id VARCHAR(255),
            total_price DECIMAL(10,2),
            total_weight DECIMAL(10,2),
            INDEX(user_id)
        );`)
    }

    const cartItemsTableExists = await connection
        .execute('SELECT 1 FROM `cart_items` LIMIT 1')
        .then(() => true)
        .catch(() => false)
    if(!cartItemsTableExists){
        await connection.execute(`CREATE TABLE cart_items (
            id INT PRIMARY KEY AUTO_INCREMENT,
            cart_id INT,
            product_id INT,
            size VARCHAR(255),
            quantity INT,
            FOREIGN KEY (cart_id) REFERENCES cart(id),
            FOREIGN KEY (product_id) REFERENCES product_details(id),
            INDEX(cart_id),
            INDEX(product_id)
        );`)
    }

    const subscribersTableExists = await connection
        .execute('SELECT 1 FROM `subscribers` LIMIT 1')
        .then(() => true)
        .catch(() => false)
    if(!subscribersTableExists){
        await connection.execute(`
        CREATE TABLE subscribers (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(255)
        )`)
    }
} */