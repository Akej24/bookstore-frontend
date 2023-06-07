import React, { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import '../css/form/Form.css';

export default function RegistrationForm(){
  
  const[user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
    surname: "",
    dateOfBirth: "",
    role: ""
  })

  const {email, username, password, name, surname, dateOfBirth, role} = user;

  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    await axios.post("http://localhost:8080/registration", user);
  }

  return (
    <>
    <Nav />
      <div class="submission-form">
        <form onSubmit = {(e)=> onSubmit(e)}>
        <h1><span>Registration</span></h1>
          <label htmlFor="email" class="inputBox">
            <span>
              E-mail
            </span>
            <input 
              type="text"
              name="email"
              placeholder="Enter your e-mail" 
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </label>
          <label htmlFor="username" class="inputBox">
            <span>
              Username
            </span>
            <input 
              type="text"
              name="username"
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => onInputChange(e)}
            />
          </label>
          <label htmlFor="password" class="inputBox">
            <span>
              Password
            </span>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </label>
          <label htmlFor="name" class="inputBox">
            <span>
              Name
            </span>
            <input 
              type="text"
              name="name"
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </label>
          <label htmlFor="surname" class="inputBox">
            <span>
              Surname
            </span>
            <input 
              type="text"
              name="surname"
              placeholder="Enter your surname" 
              value={surname}
              onChange={(e) => onInputChange(e)}
            />
          </label>
          <label htmlFor="dateOfBirth" class="inputBox">
            <span>
              Date of birth
            </span>
            <input 
              type="date"
              name="dateOfBirth"
              placeholder="Enter your date of birth" 
              value={dateOfBirth}
              onChange={(e) => onInputChange(e)}
            />
          </label>
          <label htmlFor="role" class="role">
            <label htmlFor="USER" class="inputRadio">
              <span>
                User
              </span>
              <input 
              type="radio"
              name="role"
              value="USER"
              checked={role === "USER"}
              onChange={(e) => onInputChange(e)}
              />
            </label>
            <br />
            <label htmlFor ="ADMIN" class="inputRadio">
              <span>
                Admin
              </span>
              <input 
              type="radio" 
              name="role"
              value="ADMIN"
              checked={role === "ADMIN"}
              onChange={(e) => onInputChange(e)}
              />
            </label>
          </label>
          <br />
          <input type="submit" class="buttonBox" value="Send"/>
          <input type="reset" class="buttonBox" value="Reset"/>
        </form>
      </div>
    </>
  );
}