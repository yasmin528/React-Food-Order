import { createContext, useEffect, useState } from 'react';

export const MealsContext = createContext({
    meals: null,
    addOrder: (order) => { },
    removeOrder: (id) => { },
});

export function MealsContextProvider({ children }) {
    const [meals, setMeals] = useState([]);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        async function loadMeals() {
            const response = await fetch('http://localhost:3000/meals');
            const meals = await response.json();
            setMeals(meals);
        }
        loadMeals();
    }, []);

    function addOrder(enteredOrderData) {
        const savedOrder = {
            id: Date.now(),
            ...enteredOrderData,
        };

        setOrders((prevOrders) => [savedOrder, ...prevOrders]);
    }
    function removeOrder(id) {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    }

    const contextValue = {
        meals: meals,
        orders: orders,
        addOrder,
        removeOrder,
    };

    return <MealsContext value={contextValue}>{children}</MealsContext>;
}