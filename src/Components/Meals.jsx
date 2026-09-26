import { use } from "react"
import { MealsContext } from "../store/foodOrderContext"

function formatCurrency(number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(number);
}

export function Meals() {
    const { meals } = use(MealsContext);
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
                            <button className="button">Add to Cart</button>
                        </div>
                    </div>
                ))}
        </div>
    )
}