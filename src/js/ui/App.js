import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../content/HomePage";
import LoginForm from "../form/LoginForm";
import RegistrationForm from "../form/RegistrationForm";
import BookForm from "../form/BookForm";
import BooksTable from "../table/BooksTable";
import Logout from "../content/Logout"
import Nav from "./Nav";
import "../../css/ui/App.css";

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