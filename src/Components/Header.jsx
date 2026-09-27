import { useState, use , useEffect , useRef } from 'react';
import logo from '../assets/logo.jpg';
import Cart from './Cart';
import { MealsContext } from '../store/foodOrderContext';

export function Header() {
    const { orders } = use(MealsContext);
    const modalRef = useRef();
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const total = orders.reduce(
            (sum, order) => sum + order.quantity,
            0
        );

        setTotal(total);
    }, [orders]);
    function handleOpenCart() {
        modalRef.current.open()
    }
    return (
        <>
            <header id="main-header">
                <div id="title">
                    <img src={logo} alt='order app logo' />
                    <h1>React Food</h1>
                </div>
                <button className='text-button' onClick={handleOpenCart}>Cart({total})</button>
            </header>
            {<Cart  cartRef={modalRef}/>}
        </>
    )
}