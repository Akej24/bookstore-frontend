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
            <NavElement name='Book form' href='/createBook' />
            <NavElement name='Books table' href='/getAllBooks' />
            <NavElement name='Cart' href='/' />
            <NavElement name='Checkout cart' href='/' />
            <NavElement name='Orders' href='/' />
            <NavElement name='Deliveries' href='/' />
        </nav>

    )
}