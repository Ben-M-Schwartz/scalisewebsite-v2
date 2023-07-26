import {
  mysqlTable,
  int,
  double,
  varchar,
  index,
  serial,
  timestamp,
  float,
  json,
  boolean,
} from "drizzle-orm/mysql-core";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

export const product_details = mysqlTable(
  "product_details",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    price: double("price", { precision: 10, scale: 2 }),
    description: varchar("description", { length: 1000 }),
    image: varchar("image", { length: 255 }),
    weight: float("weight"),
    is_taxed: int("is_taxed"),
    store_order: int("store_order"),
    sale_price: double("sale_price", { precision: 10, scale: 2 }),
  },
  (product_details) => ({
    idIndex: index("productDetails_id_index").on(product_details.id),
    nameIndex: index("product_name_index").on(product_details.name),
  })
);

export const product_quantity = mysqlTable(
  "product_quantity",
  {
    id: serial("id").primaryKey().notNull(),
    product_id: int("product_id"),
    size: varchar("size", { length: 255 }),
    quantity: int("quantity"),
  },
  (product_quantity) => ({
    id_size_index_inventory: index("id_size_index_inventory").on(
      product_quantity.product_id,
      product_quantity.size
    ),
  })
);

export const in_checkout_amounts = mysqlTable(
  "in_checkout_amounts",
  {
    id: serial("id").primaryKey().notNull(),
    product_id: int("product_id"),
    stripe_checkout_id: varchar("stripe_checkout_id", { length: 255 }),
    size: varchar("size", { length: 255 }),
    quantity: int("quantity"),
    created_at: timestamp("created_at").notNull().defaultNow(),
  },
  (amounts) => ({
    id_size_index_checkouts: index("id_size_index_checkouts").on(
      amounts.product_id,
      amounts.size
    ),
  })
);

export const carts = mysqlTable(
  "carts",
  {
    id: serial("id").primaryKey().notNull(),
    cart_id: varchar("id", { length: 32 }).primaryKey().notNull(),
    total_price: double("total_price", { precision: 10, scale: 2 }),
    total_weight: float("total_weight"),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    idIndex: index("cart_id_index").on(table.cart_id),
  })
);

export const cart_items = mysqlTable(
  "cart_items",
  {
    id: serial("id").primaryKey().notNull(),
    cart_id: varchar("cart_id", { length: 32 }),
    product_id: int("product_id"),
    size: varchar("size", { length: 255 }),
    quantity: int("quantity"),
    price: double("price", { precision: 10, scale: 2 }),
    weight: float("weight"),
    item_name: varchar("item_name", { length: 255 }),
    image: varchar("image", { length: 255 }),
  },
  (cart_items) => ({
    cartIdIndex: index("cart_items__cart_id__idx").on(cart_items.cart_id),
    productId_Size__cartId_Index: index("product_id_size_cart_id_index").on(
      cart_items.product_id,
      cart_items.size,
      cart_items.cart_id
    ),
  })
);

export const potential_subscribers = mysqlTable(
  "potential_subscribers",
  {
    id: serial("id").primaryKey().notNull(),
    email: varchar("email", { length: 255 }),
    token: varchar("token", { length: 255 }),
    created_at: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    subscriberIndex: index("subscriber_index").on(table.token),
  })
);

export const subscribers = mysqlTable(
  "subscribers",
  {
    id: serial("id").primaryKey().notNull(),
    email: varchar("email", { length: 255 }),
  },
  (table) => ({
    subscribedIndex: index("subscribed_index").on(table.email),
  })
);
export const notifiedAlreadySubscribed = mysqlTable(
  "notifiedAlreadySubscribed",
  {
    id: serial("id").primaryKey().notNull(),
    email: varchar("email", { length: 255 }),
  },
  (table) => ({
    notifiedIndex: index("notified_index").on(table.email),
  })
);

export const stockNotifications = mysqlTable(
  "stockNotifications",
  {
    id: serial("id").primaryKey().notNull(),
    email: varchar("email", { length: 255 }),
    product_id: int("product_id"),
    size: varchar("size", { length: 255 }),
  },
  (table) => ({
    notificationIndex: index("notificationIndex").on(
      table.product_id,
      table.size
    ),
    subIndex: index("subIndex").on(table.email, table.product_id, table.size),
  })
);

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey().notNull(),
  item: varchar("item", { length: 255 }),
  size: varchar("size", { length: 255 }),
  quantity: int("quantity"),
  customer_name: varchar("customer_name", { length: 255 }),
  customer_email: varchar("customer_email", { length: 255 }),
  customer_city: varchar("customer_city", { length: 255 }),
  customer_state: varchar("customer_state", { length: 255 }),
  customer_zip: varchar("customer_zip", { length: 255 }),
  customer_country: varchar("customer_country", { length: 255 }),
  customer_addressLine1: varchar("customer_addressLine1", { length: 255 }),
  customer_addressLine2: varchar("customer_addressLine2", { length: 255 }),
  stripe_checkout_session_id: varchar("stripe_checkout_session_id", {
    length: 255,
  }),
  payment_intent_id: varchar("payment_intent_id", { length: 255 }),
  payment_status: varchar("payment_status", { length: 255 }),
  shipped: boolean("shipped").default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const shows = mysqlTable(
  "shows",
  {
    id: serial("id").primaryKey().notNull(),
    date: varchar("date", { length: 255 }),
    time: varchar("time", { length: 255 }),
    location: varchar("location", { length: 255 }),
    name: varchar("name", { length: 255 }),
    maps_link: varchar("maps_link", { length: 255 }),
    bandsintown_link: varchar("bandsintown_link", { length: 5000 }),
    ticket_link: varchar("ticket_link", { length: 5000 }),
  },
  (table) => ({
    showIndex: index("showIndex").on(table.id),
  })
);

export const emailDesigns = mysqlTable(
  "emailDesigns",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    json: json("json"),
  },
  (table) => ({
    designIndex: index("designIndex").on(table.name),
  })
);

/*
!DRIZZLE HAS AN ERROR FOR TIMESTAMPS NEED TO CHANGE (now()) to NOW() and manually add ON UPDATE NOW() to
!updated_at column in migrations
*/
//npx drizzle-kit generate:mysql --out migrations-folder --schema src/db/schema.ts
