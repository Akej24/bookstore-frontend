import NavElement from './NavElement'
import '../../css/view/Nav.css';

export default function Nav() {
    return (
        <nav>
            <NavElement name='Home page' href='/' />
            <NavElement name='Register' href='/registration' />
            <NavElement name='Log in' href='/login' />
            <NavElement name='Log out' href='/logout' />
            <NavElement name='Account' href='/' />
            <NavElement name='Users' href='/' />
            <NavElement name='Book form' href='/create-book' />
            <NavElement name='Books table' href='/books' />
            <NavElement name='Cart' href='/' />
            <NavElement name='Checkout cart' href='/' />
            <NavElement name='Orders' href='/orders' />
            <NavElement name='Deliveries' href='/' />
        </nav>

    )
}