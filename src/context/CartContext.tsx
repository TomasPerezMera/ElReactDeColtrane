import { createContext, useState } from "react";
import useToast from "../hooks/useToast";

export interface CatalogItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    source: string;
    description: string;
    available: boolean;
    featured: boolean;
};

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    source: string;
    description: string;
};

export interface CartContextInterface {
    cartList: CartItem[];
    totalItems: number;
    addCartItem: (item: CartItem, quantity: number) => void;
    clearCart: () => void;
    deleteCartItem: (id: number) => void;
    updateCartItemQuantity: (id: number, newQuantity: number) => void;
};

type Props = {
    children: React.ReactNode;
};

export const CartContext = createContext<CartContextInterface | undefined>(undefined);

const CartContextProvider = ({ children }: Props) => {
    const toast = useToast;
    const [cartList, setCartList] = useState<CartItem[]>([]);

    const getTotalItemQuantity = () => cartList.reduce((sum, item) => sum + item.quantity, 0);
    const totalItems = getTotalItemQuantity();

    const addCartItem = (item: CartItem, quantity: number) => {

        // Global Quantity Check before triggering addition.
        if (getTotalItemQuantity() + quantity > 3) {
            toast("Sólo se permiten 3 ítems por compra!", 2000);
            return;
        }

        const existingItem = cartList.find(prod => prod.id === item.id);

        if (existingItem) {
            // If item exists, update its quantity by adding the new quantity.
            setCartList(cartList.map(prod =>
                prod.id === item.id
                    ? { ...prod, quantity: prod.quantity + quantity }
                    : prod
            ));
        } else {
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

    // Function to update the quantity of an item already in the cart.
    const updateCartItemQuantity = (id: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            deleteCartItem(id);
            return;
        }

        // Check if the new total quantity exceeds the global limit.
        const currentItem = cartList.find(item => item.id === id);
        const currentItemQuantity = currentItem ? currentItem.quantity : 0;
        const quantityDifference = newQuantity - currentItemQuantity;

        // Only check global limit if we are increasing the quantity.
        if (quantityDifference > 0) {
            const totalQuantityExcludingCurrent = totalItems - currentItemQuantity;
            if (totalQuantityExcludingCurrent + newQuantity > 3) {
                useToast("Sólo se permiten 3 ítems por compra en total.", 2000);
                return;
            }
        }

        setCartList(cartList.map(item =>
            item.id === id
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    return (
        <CartContext.Provider value={{ cartList, totalItems, addCartItem, clearCart, deleteCartItem, updateCartItemQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;