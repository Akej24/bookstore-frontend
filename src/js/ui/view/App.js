import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../routes/HomePage";
import LoginForm from "../routes/LoginForm";
import RegistrationForm from "../routes/RegistrationForm";
import BookForm from "../routes/BookForm";
import BooksTable from "../routes/BooksTable";
import Logout from "../routes/Logout"
import Nav from "./Nav";
import "../../../css/ui/App.css";

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
                                <Route exact path="/login" element={<LoginForm />} />
                                <Route exact path="/registration" element={<RegistrationForm />} />
                                <Route exact path="/createBook" element={<BookForm />} />
                                <Route exact path="/getAllBooks" element={<BooksTable />} />
                                <Route exact path="/logout" element={<Logout />} />
                            </Routes>
                        </Router>
                    </main>
                </div>
            </div>
        );
    }
}