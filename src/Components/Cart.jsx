import { use, useEffect, useState, useRef, useImperativeHandle } from "react"
import { MealsContext } from "../store/foodOrderContext"
import { CartItem } from "./CartItem";
import { Modal } from "./Modal";
import formatCurrency from "../utils/utils";
import { CheckoutCart } from "./CheckoutCart";

export default function Cart({ cartRef }) {
    const { orders } = use(MealsContext);
    const [total, setTotal] = useState(0);
    const checkoutRef = useRef();

    useEffect(() => {
        const total = orders.reduce(
            (sum, order) => sum + order.mealPrice * order.quantity,
            0
        );

        setTotal(total);
    }, [orders]);

    function closeCart() {
        cartRef.current.close();
    }
    function handleCheckOut() {
        checkoutRef.current.open();
    }
    return (
        <>
            <Modal ref={cartRef}>
                <h2>Your Cart</h2>

                {orders?.length === 0 ? (
                    <>
                        <p>Your cart is empty.</p>
                        <div className="modal-actions">
                            <button className="text-button" onClick={closeCart}>
                                Close
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {orders.map((order) => (
                            <CartItem
                                key={order.id}
                                orderId={order.id}
                                quantity={order.quantity}
                                mealName={order.mealName}
                                mealPrice={order.mealPrice}
                            />
                        ))}

                        <div className="cart-total">
                            <p>{formatCurrency(total)}</p>
                        </div>

                        <div className="modal-actions">
                            <button className="text-button" onClick={closeCart}>
                                Close
                            </button>
                            <button className="button" onClick={handleCheckOut}>
                                Go to Checkout
                            </button>
                        </div>
                    </>
                )}
            </Modal>
            <CheckoutCart ref={checkoutRef} total={total}/>
        </>
    )
}