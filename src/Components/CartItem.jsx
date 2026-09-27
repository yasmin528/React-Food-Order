import { use } from "react"
import { MealsContext } from "../store/foodOrderContext"
import formatCurrency from "../utils/utils";

export function CartItem({orderId, mealName , quantity, mealPrice }) {
    const {  incrementOrder, decrementOrder } = use(MealsContext);
        function incrementQuatity(){
            incrementOrder(orderId)
        }
        function decrementQuatity(){
            decrementOrder(orderId)
        }
    return (
        <ul >
            <li className="cart-item">
                <p>{`${mealName} - ${quantity} x ${formatCurrency(mealPrice)}`}</p>
                <div className="cart-item-actions">
                    <button onClick={decrementQuatity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={incrementQuatity}>+</button>
                </div>
            </li>
        </ul>
    )
}