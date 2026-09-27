import { use } from "react";
import { MealsContext } from "../store/foodOrderContext";
import formatCurrency from "../utils/utils";


export function Meals() {
    const { meals , addOrder } = use(MealsContext);
    function handleAddToCart(meal){
        addOrder({
            mealId : meal.id,
            mealName: meal.name,
            mealPrice: meal.price
        })
    }
    return (
        <div id="meals">
            {meals &&
                meals.map((meal) => (
                    <div className="meal-item" key={meal.id}>

                        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                        <h3>{meal.name}</h3>
                        <span className="meal-item-price">{formatCurrency(meal.price)}</span>

                        <p className="meal-item-description">{meal.description}</p>
                        <div className="meal-item-actions">
                            <button className="button" onClick={()=>handleAddToCart(meal)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
        </div>
    )
}