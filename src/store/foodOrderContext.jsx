import { createContext, useEffect, useState } from 'react';

export const MealsContext = createContext({
    meals: null,
    addOrder: (order) => { },
    incrementOrder: (id) => { },
    decrementOrder: (id) => { },
    checkout: (id) =>{}
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
        setOrders((prevOrders) => {
            const existingOrder = prevOrders.find(
                (order) => order.mealId === enteredOrderData.mealId
            );

            if (existingOrder) {
                return prevOrders.map((order) =>
                    order.mealId === enteredOrderData.mealId
                        ? { ...order, quantity: order.quantity + 1 }
                        : order
                );
            }

            const savedOrder = {
                id: Date.now(),
                ...enteredOrderData,
                quantity: 1,
            };

            return [savedOrder, ...prevOrders];
        });
    }
    function incrementOrder(id) {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id
                    ? { ...order, quantity: order.quantity + 1 }
                    : order
            )
        );
    }

    function decrementOrder(id) {
        setOrders((prevOrders) =>
            prevOrders
                .map((order) =>
                    order.id === id
                        ? { ...order, quantity: order.quantity - 1 }
                        : order
                )
                .filter((order) => order.quantity > 0)
        );
    }

    async function checkout(fullName, email, street, postalCode, city) {
        const orderData = {
            order: {
                items: orders.map((order) => ({
                    id: order.mealId,
                    name: order.mealName,
                    price: order.mealPrice,
                    quantity: order.quantity,
                })),
                customer: {
                    email,
                    name: fullName,
                    street,
                    "postal-code": postalCode,
                    city,
                },
            },
        };

        const response = await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (!response.ok) {
            return data.message;
        }

        setOrders([]);
        return data.message;
    }
    const contextValue = {
        meals: meals,
        orders: orders,
        addOrder,
        incrementOrder,
        decrementOrder,
        checkout
    };

    return <MealsContext value={contextValue}>{children}</MealsContext>;
}