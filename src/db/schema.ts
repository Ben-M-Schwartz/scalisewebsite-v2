//drizzle implementation
import { mysqlTable, int, decimal, varchar, index, serial } from 'drizzle-orm/mysql-core';

export const product_details = mysqlTable(
  'product_details',
  {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }),
    price: decimal('price', { precision: 10, scale: 2 }),
    image_path: varchar('image_path', { length: 255 }),
    weight: decimal('weight', { precision: 10, scale: 2 }),
    sizes: varchar('sizes', { length: 255 }),
  },
  table => ({
    idIndex: index('product_details__name__idx').on(table.id),
    nameIndex: index('product_details__name__idx').on(table.name),
    priceIndex: index('product_details__price__idx').on(table.price)
  })
);

export const product_quantity = mysqlTable(
  'product_quantity',
  {
    id: serial('id').primaryKey().notNull(),
    product_id: int('product_id'),
    size: varchar('size', { length: 255 }),
    quantity: int('quantity')
  },
  product_quantity => ({
    productIdIndex: index('product_quantity__product_id__idx').on(product_quantity.product_id),
  })
);

export const in_checkout_amounts = mysqlTable(
  'in_checkout_amounts',
  {
    id: serial('id').primaryKey().notNull(),
    product_id: int('product_id'),
    stripe_checkout_id:  varchar('stripe_checkout_id', { length: 255 }),
    size: varchar('size', { length: 255 }),
    quantity: int('quantity')
  }
)


export const carts = mysqlTable(
  'carts',
  {
    id: serial('id').primaryKey().notNull(),
    cart_id: varchar('id', { length: 32 }).primaryKey().notNull(),
    total_price: decimal('total_price', { precision: 10, scale: 2 }),
    total_weight: decimal('total_weight', { precision: 10, scale: 2 })
  },
  table => ({
    idIndex: index('carts__id__idx').on(table.id)
  })
);

export const cart_items = mysqlTable(
    'cart_items',
    {
      id: serial('id').primaryKey().notNull(),
      cart_id: varchar('cart_id', { length: 32 }),
      product_id: int('product_id'),
      size: varchar('size', { length: 255 }),
      quantity: int('quantity'),
      price: decimal('price', { precision: 10, scale: 2 }),
      weight: decimal('weight', { precision: 10, scale: 2 }),
      item_name:  varchar('item_name', { length: 255 }),
    
    },
    cart_items => ({
      cartIdIndex: index('cart_items__cart_id__idx').on(cart_items.cart_id),
      productIdIndex: index('cart_items__product_id__idx').on(cart_items.product_id),
    })
  );

export const potential_subscribers = mysqlTable(
  'potential_subscribers',
  {
    id: serial('id').primaryKey().notNull(),
    email: varchar('email', { length: 255 }),
    token: varchar('token', { length: 255 })
  }
)

export const subscribers = mysqlTable(
  'subscribers',
  {
    id: serial('id').primaryKey().notNull(),
    email: varchar('email', { length: 255 })
  }
);

export const stockNotifications = mysqlTable(
  'stockNotifications',
  {
    id: serial('id').primaryKey().notNull(),
    email: varchar('email', { length: 255 }),
    product_id: int('product_id'),
    size: varchar('size', { length: 255 }),
  }
)
  
export const orders = mysqlTable(
  'orders',
  {
    id: serial('id').primaryKey().notNull(),
    item: varchar('item', { length: 255 }),
    size: varchar('size', { length: 255 }),
    quantity: int('quantity'),
    customer_name:  varchar('customer_name', { length: 255 }),
    customer_email:  varchar('customer_email', { length: 255 }),
    customer_phone:  varchar('customer_phone', { length: 255 }),
    customer_city:  varchar('customer_city', { length: 255 }),
    customer_state:  varchar('customer_state', { length: 255 }),
    customer_zip:  varchar('customer_zip', { length: 255 }),
    customer_country:  varchar('customer_country', { length: 255 }),
    customer_addressLine1:  varchar('customer_addressLine1', { length: 255 }),
    customer_addressLine2:  varchar('customer_addressLine2', { length: 255 }),
    stripe_checkout_session_id:  varchar('stripe_checkout_session_id', { length: 255 }),
    payment_intent_id:  varchar('payment_intent_id', { length: 255 }),
    payment_status: varchar('payment_status', { length: 255 }),
  }
)

