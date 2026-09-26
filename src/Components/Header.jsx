import logo from '../assets/logo.jpg'
export function Header() {
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt='order app logo' />
                <h1>React Food</h1>
            </div>
            <button className='text-button'>Cart(5)</button>
        </header>
    )
}