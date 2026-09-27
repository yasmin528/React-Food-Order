import { use, useRef } from "react";
import { MealsContext } from "../store/foodOrderContext";
import { Modal } from "./Modal";
import formatCurrency from "../utils/utils";
import { useActionState } from "react";

export function CheckoutCart({ total, ref }) {
    const { checkout } = use(MealsContext);
    const messageRef = useRef();
    async function checkoutAction(prevState, formData) {
        const fullName = formData.get("fullName");
        const email = formData.get("email");
        const street = formData.get("street");
        const postalCode = formData.get("postalCode");
        const city = formData.get("city");

        let errors = [];

        if (!fullName.trim()) {
            errors.push("Please enter your full name.");
        } else if (fullName.length < 3) {
            errors.push("Full name must be at least 3 characters.");
        }

        if (!email) {
            errors.push("Please enter your email address.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("Please enter a valid email address.");
        }

        if (!street.trim()) {
            errors.push("Please enter your street address.");
        }

        if (!postalCode) {
            errors.push("Please enter your postal code.");
        } else if (!/^\d{5}$/.test(postalCode)) {
            errors.push("Postal code must contain 5 digits.");
        }

        if (!city.trim()) {
            errors.push("Please enter your city.");
        }
        if (errors.length > 0) {
            return {
                errors: errors, savedValues: {
                    fullName,
                    email,
                    street,
                    postalCode,
                    city
                }
            }
        }
        //backend
        const message = await checkout(fullName, email, street, postalCode, city);
        messageRef.current.open();
        setTimeout(() => {
            messageRef.current.close();
            closeCheckout();
        }, 2000);
        return { errors: null , message: message}
    }
    function closeCheckout() {
        ref.current.close();
    }
    
    const [formStatus, formAction] = useActionState(checkoutAction, { errors: null })
    return (
        <Modal ref={ref}>
            <h2>Checkout</h2>
            <p>Total Amount {formatCurrency(total)}</p>
            <form action={formAction}>
                <div className="control">
                    <label>
                        Full Name
                    </label>
                    <input type="text" name="fullName" defaultValue={formStatus.savedValues?.fullName} />
                </div>
                <div className="control">
                    <label>
                        E-Mail Address
                    </label>
                    <input type="email" name="email" defaultValue={formStatus.savedValues?.email} />
                </div>
                <div className="control">
                    <label>
                        Street
                    </label>
                    <input type="text" name="street" defaultValue={formStatus.savedValues?.street} />
                </div>
                <div className="control-row">
                    <div className="control">
                        <label>
                            Postal Code
                        </label>
                        <input type="text" name="postalCode" defaultValue={formStatus.savedValues?.postalCode} />
                    </div>
                    <div className="control">
                        <label>
                            City
                        </label>
                        <input type="text" name="city" defaultValue={formStatus.savedValues?.city} />
                    </div>
                </div>
                {
                    formStatus.errors && formStatus.errors.map((error) => {
                        return (
                            <div className="error" key={error}>
                                <p>{error}</p>
                            </div>
                        )
                    })
                }
                <div className="modal-actions">
                    <button className="text-button" type="button" onClick={closeCheckout}>
                        Close
                    </button>
                    <button className="button" type="submit">
                        Submit Order
                    </button>
                </div>
                <Modal ref={messageRef}>
                    <p>{formStatus?.message}</p>
                </Modal>
            </form>
        </Modal>
    )
}