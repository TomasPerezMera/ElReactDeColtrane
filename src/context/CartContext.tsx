import { createContext, useState } from "react";

export type CatalogItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    source: string;
    description: string;
    available: boolean;
    year: number;
};

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    source: string;
    description: string;
};

export type CartContextType = {
    cartList: CartItem[];
    addToCart: (item: CatalogItem, quantity: number) => void;
    clearList: () => void;
    deleteItem: (id: number) => void;
};

type Props = {
    children: React.ReactNode;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartContextProvider = ({ children }: Props) => {
    const [cartList, setCartList] = useState<CartItem[]>([]);

    const addToCart = (item: CatalogItem, quantity: number) => {
        const existingItem = cartList.find(prod => prod.id === item.id);
    if (existingItem) {
        setCartList(cartList.map(prod =>
            prod.id === item.id
            ? { ...prod, quantity: prod.quantity + quantity }
            : prod
        ));
    } else {
        const newItem: CartItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            source: item.source,
            description: item.description,
            quantity: quantity
            };
        setCartList([...cartList, newItem]);
        }
    };

    const clearList = () => setCartList([]);

    const deleteItem = (id: number) => {
        setCartList(cartList.filter(prod => prod.id !== id));
    };
    return (
        <CartContext.Provider value={{ cartList, addToCart, clearList, deleteItem }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;