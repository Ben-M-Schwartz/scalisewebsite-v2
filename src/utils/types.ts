export interface Product {
    itemName: string;
    sizes: string[];
    stock: number[];
    weight: number;
    price: number;
    image: string;
}

export interface CartItem {
    productId: string;
    itemName: string;
    quantity: number;
    size: string;
    image: string;
    price: number;
    weight: number;
    total: number;
    totalWeight: number;
}

export interface Cart {
    cartId: string;
    items: CartItem[];
    subTotal: number;
    totalWeight: number;
}