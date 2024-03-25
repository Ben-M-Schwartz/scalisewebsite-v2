// import {
//   sqliteTable,
//   int,
//   real,
//   text,
//   index,
//   serial,
//   timestamp,
//   real,
//   json,
//   boolean,
// } from "drizzle-orm/mysql-core";

import { sql } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  real,
  text,
  index,
  blob,
} from "drizzle-orm/sqlite-core";

export const config = {
  runtime: "experimental-edge",
  regions: ["cle1"],
};

export const product_details = sqliteTable(
  "product_details",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name"),
    price: real("price"),
    description: text("description"),
    image: text("image"),
    weight: real("weight"),
    store_order: integer("store_order"),
    sale_price: real("sale_price"),
  },
  (product_details) => ({
    idIndex: index("productDetails_id_index").on(product_details.id),
    nameIndex: index("product_name_index").on(product_details.name),
  })
);

export const product_quantity = sqliteTable(
  "product_quantity",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    product_id: integer("product_id"),
    size: text("size"),
    quantity: integer("quantity"),
  },
  (product_quantity) => ({
    id_size_index_inventory: index("id_size_index_inventory").on(
      product_quantity.product_id,
      product_quantity.size
    ),
  })
);

export const in_checkout_amounts = sqliteTable(
  "in_checkout_amounts",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    product_id: integer("product_id"),
    stripe_checkout_id: text("stripe_checkout_id"),
    size: text("size"),
    quantity: integer("quantity"),
    created_at: integer("created_at", { mode: "timestamp" }).default(
      sql`(CURRENT_TIMESTAMP)`
    ),
  },
  (amounts) => ({
    id_size_index_checkouts: index("id_size_index_checkouts").on(
      amounts.product_id,
      amounts.size
    ),
  })
);

export const carts = sqliteTable(
  "carts",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    cart_id: text("id").primaryKey().notNull(),
    total_price: real("total_price"),
    total_weight: real("total_weight"),
    created_at: integer("created_at", { mode: "timestamp" }).default(
      sql`(CURRENT_TIMESTAMP)`
    ),
    updated_at: integer("updated_at", { mode: "timestamp" }).default(
      sql`(CURRENT_TIMESTAMP) on update (CURRENT_TIMESTAMP)`
    ),
  },
  (table) => ({
    idIndex: index("cart_id_index").on(table.cart_id),
  })
);

export const cart_items = sqliteTable(
  "cart_items",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    cart_id: text("cart_id"),
    product_id: integer("product_id"),
    size: text("size"),
    quantity: integer("quantity"),
    price: real("price"),
    weight: real("weight"),
    item_name: text("item_name"),
    image: text("image"),
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

export const potential_subscribers = sqliteTable(
  "potential_subscribers",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    email: text("email"),
    token: text("token"),
    created_at: integer("updated_at", { mode: "timestamp" }).default(
      sql`(CURRENT_TIMESTAMP) on update (CURRENT_TIMESTAMP)`
    ),
  },
  (table) => ({
    subscriberIndex: index("subscriber_index").on(table.token),
  })
);

export const subscribers = sqliteTable(
  "subscribers",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    email: text("email"),
    created_at: integer("updated_at", { mode: "timestamp" }).default(
      sql`(CURRENT_TIMESTAMP) on update (CURRENT_TIMESTAMP)`
    ),
  },
  (table) => ({
    subscribedIndex: index("subscribed_index").on(table.email),
  })
);
export const notifiedAlreadySubscribed = sqliteTable(
  "notifiedAlreadySubscribed",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    email: text("email"),
  },
  (table) => ({
    notifiedIndex: index("notified_index").on(table.email),
  })
);

export const stockNotifications = sqliteTable(
  "stockNotifications",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    email: text("email"),
    product_id: integer("product_id"),
    size: text("size"),
  },
  (table) => ({
    notificationIndex: index("notificationIndex").on(
      table.product_id,
      table.size
    ),
    subIndex: index("subIndex").on(table.email, table.product_id, table.size),
  })
);

export const orders = sqliteTable("orders", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  item: text("item"),
  size: text("size"),
  quantity: integer("quantity"),
  customer_name: text("customer_name"),
  customer_email: text("customer_email"),
  customer_city: text("customer_city"),
  customer_state: text("customer_state"),
  customer_zip: text("customer_zip"),
  customer_country: text("customer_country"),
  customer_addressLine1: text("customer_addressLine1"),
  customer_addressLine2: text("customer_addressLine2"),
  stripe_checkout_session_id: text("stripe_checkout_session_id"),
  payment_intent_id: text("payment_intent_id"),
  payment_status: text("payment_status"),
  shipped: integer("shipped", { mode: "boolean" }).default(0),
  created_at: integer("updated_at", { mode: "timestamp" }).default(
    sql`(CURRENT_TIMESTAMP) on update (CURRENT_TIMESTAMP)`
  ),
});

export const shows = sqliteTable(
  "shows",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    date: text("date"),
    location: text("location"),
    name: text("name"),
    maps_link: text("maps_link"),
    bandsintown_link: text("bandsintown_link"),
    ticket_link: text("ticket_link"),
    ticket_button_text: text("ticket_button_text"),
    // free: boolean("free").default(false),
  },
  (table) => ({
    showIndex: index("showIndex").on(table.id),
  })
);

export const emailDesigns = sqliteTable(
  "emailDesigns",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name"),
    json: blob("json", { mode: "json" }).$type<{ foo: string }>(),
  },
  (table) => ({
    designIndex: index("designIndex").on(table.name),
  })
);
