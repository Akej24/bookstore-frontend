import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import BookForm from "./BookForm";
import BooksTable from "./BooksTable";
import "./css/App.css";

export default class App extends React.Component{
    render(){
        return (
            <div className="App">
                <div id="container">
                <Router>
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route exact path="/login" element={<LoginForm />} />
                        <Route exact path="/registration" element={<RegistrationForm />} />
                        <Route exact path="/createBook" element={<BookForm />} />
                        <Route exact path="/getAllBooks" element={<BooksTable />} />
                    </Routes>
                </Router>
                </div>
            </div>
        );
    }   
}