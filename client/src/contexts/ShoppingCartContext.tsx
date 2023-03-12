import { createContext, useContext } from 'react';
import useSessionStorage from '../hooks/useSessionStorage';

export const ShoppingCartContext = createContext<object | null>(null);

const initialShoppinCartState = {
    productOrders: [],
    scheduledServices: []
};


interface Props {
    children: React.ReactNode
}

export const ShoppingCartProvider = ({children}: Props) => {
    const [shoppingCart, setShoppingCart] = useSessionStorage('shoppingCart', initialShoppinCartState);

    return (
        <ShoppingCartContext.Provider value={{}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export const useShoppingCartContext = () => {
    const shoppingCartState = useContext(ShoppingCartContext);

    return shoppingCartState;
};