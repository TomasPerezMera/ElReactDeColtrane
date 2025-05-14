import { createContext, useState } from "react";
import useToast from "../hooks/useToast";

export type CatalogItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    source: string;
    description: string;
    available: boolean;
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
    totalItems: number;
    addCartItem: (item: CartItem, quantity: number) => void;
    clearCart: () => void;
    deleteCartItem: (id: number) => void;
    // START: Added updateCartItemQuantity to context type
    updateCartItemQuantity: (id: number, newQuantity: number) => void;
    // END: Added updateCartItemQuantity to context type
};

type Props = {
    children: React.ReactNode;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartContextProvider = ({ children }: Props) => {
    const [cartList, setCartList] = useState<CartItem[]>([]);

    const getTotalItemQuantity = () => cartList.reduce((sum, item) => sum + item.quantity, 0);
    const totalItems = getTotalItemQuantity();

    const addCartItem = (item: CartItem, quantity: number) => {
        const currentTotal = getTotalItemQuantity();

        // Global Quantity Check before triggering addition.
        // This check is for adding *new* items or adding *more* quantity.
        if (currentTotal + quantity > 3) {
            useToast("Sólo se permiten 3 ítems por compra!", 2000);
            return;
        }

        const existingItem = cartList.find(prod => prod.id === item.id);

        if (existingItem) {
            // If item exists, update its quantity by adding the new quantity
            setCartList(cartList.map(prod =>
                prod.id === item.id
                    ? { ...prod, quantity: prod.quantity + quantity }
                    : prod
            ));
        } else {
            // If item is new, add it with the specified quantity
            const newItem: CartItem = {
                ...item,
                quantity
            };
            setCartList([...cartList, newItem]);
        }
    };

    const clearCart = () => setCartList([]);

    const deleteCartItem = (id: number) => {
        setCartList(cartList.filter(prod => prod.id !== id));
    };

    // START: Added new function to update the quantity of an item already in the cart
    const updateCartItemQuantity = (id: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            // If new quantity is 0 or less, remove the item
            deleteCartItem(id);
            return;
        }

        // Check if the new total quantity exceeds the global limit (only when increasing)
        const currentItem = cartList.find(item => item.id === id);
        const currentItemQuantity = currentItem ? currentItem.quantity : 0;
        const quantityDifference = newQuantity - currentItemQuantity;

        // Only check global limit if we are increasing the quantity
        if (quantityDifference > 0) {
             const totalQuantityExcludingCurrent = totalItems - currentItemQuantity;
             if (totalQuantityExcludingCurrent + newQuantity > 3) {
                 useToast("Sólo se permiten 3 ítems por compra en total.", 2000);
                 return; // Prevent updating if it exceeds the limit
             }
        }

        setCartList(cartList.map(item =>
            item.id === id
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };
    // END: Added new function to update the quantity of an item already in the cart


    return (
        // START: Included the new function in the context value
        <CartContext.Provider value={{ cartList, totalItems, addCartItem, clearCart, deleteCartItem, updateCartItemQuantity }}>
            {children}
        </CartContext.Provider>
        // END: Included the new function in the context value
    );
};

export default CartContextProvider;