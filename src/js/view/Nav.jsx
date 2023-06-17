import NavElement from './NavElement'
import '../../css/view/Nav.css'

export default function Nav() {
    return (
        <nav>
            <NavElement name='Home page' href='/' />
            <NavElement name='Register' href='/registration' />
            <NavElement name='Log in' href='/login' />
            <NavElement name='Log out' href='/logout' />
            <NavElement name='Account' href='/account' />
            <NavElement name='Users' href='/users' />

            <NavElement name='Book form' href='/create-book' />
            <NavElement name='Books table' href='/books' />
            <NavElement name='Cart' href='/cart' />
            <NavElement name='Checkout cart' href='/checkoutcart' />
            <NavElement name='Orders' href='/orders' />
            <NavElement name='Deliveries' href='/deliveries' />
        </nav>

    )
}