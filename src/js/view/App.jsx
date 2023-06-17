import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../routes/HomePage'
import RegistrationForm from '../routes/RegistrationForm'
import LoginForm from '../routes/LoginForm'
import Logout from '../routes/Logout'
import Account from '../routes/Account'
import Users from '../routes/Users'
import BookForm from "../routes/BookForm"
import Books from '../routes/Books'
import Cart from '../routes/Cart'
import CheckoutCart from '../routes/CheckoutCart'
import Orders from '../routes/Orders'
import Deliveries from '../routes/Deliveries'
import Nav from './Nav'
import '../../css/view/App.css'

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div id="container">
                    <Nav />
                    <main>
                        <Router>
                            <Routes>
                                <Route exact path="/" element={<HomePage />} />
                                <Route exact path="/registration" element={<RegistrationForm />} />
                                <Route exact path="/login" element={<LoginForm />} />
                                <Route exact path="/logout" element={<Logout />} />
                                <Route exact path="/account" element={<Account />} />
                                <Route exact path="/users" element={<Users />} />

                                <Route exact path="/create-book" element={<BookForm variant='create' bookInitialState='' />} />
                                <Route exact path="/books" element={<Books />} />
                                <Route exact path="/cart" element={<Cart />} />
                                <Route exact path="/checkoutcart" element={<CheckoutCart />} />
                                <Route exact path="/orders" element={<Orders />} />
                                <Route exact path="/deliveries" element={<Deliveries />} />
                            </Routes>
                        </Router>
                    </main>
                </div>
            </div>
        )
    }
}