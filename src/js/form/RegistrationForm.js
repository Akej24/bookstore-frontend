import React, { useState } from "react";
import axios from "axios";
import Header from "../ui/Header";
import InputField from "./InputField";
import InputRadio from "./InputRadio";
import SubmitButton from "./SubmitButton";
import ResetButton from "./ResetButton";
import SuccessMessage from "./SuccessMessage";
import ErrorMessages from "./ErrorMessages";
import '../../css/form/Form.css';

export default function RegistrationForm() {

	const userInitialState = {
		email: '',
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		role: ''
	}
	const [user, setUser] = useState(userInitialState)
	const [errors, setErrors] = useState([])
	const [success, setSuccess] = useState('')
	const { email, username, password, firstName, lastName, dateOfBirth, role } = user;

	function onInputChange(e) {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	async function onSubmit(e) {
		e.preventDefault();
		await axios
			.post("http://localhost:8080/api/v1/users/registration", user)
			.then(() => {
				setSuccess("Successively registered")
				setErrors([])
			})
			.catch(error => {
				setSuccess('')
				setErrors(error.response.data.errors);
			})
	}

	function onReset(e) {
		setUser(userInitialState)
	}

	return (
		<div className="submission-form" id="registration-form">
			<form onSubmit={(e) => onSubmit(e)}>
				<Header content='Registration' />
				<InputField
					label="Email"
					type="text"
					name="email"
					placeholder="Enter your e-mail"
					value={email}
					onChange={onInputChange}
				/>
				<InputField
					label="Username"
					type="text"
					name="username"
					placeholder="Enter your username"
					value={username}
					onChange={onInputChange}
				/>
				<InputField
					label="Password"
					type="password"
					name="password"
					placeholder="Enter your password"
					value={password}
					onChange={onInputChange}
				/>
				<InputField
					label="First name"
					type="text"
					name="firstName"
					placeholder="Enter your first name"
					value={firstName}
					onChange={onInputChange}
				/>
				<InputField
					label="Last name"
					type="text"
					name="lastName"
					placeholder="Enter your last name"
					value={lastName}
					onChange={onInputChange}
				/>
				<InputField
					label="Date of birth"
					type="date"
					name="dateOfBirth"
					placeholder="Enter your date of birth"
					value={dateOfBirth}
					onChange={onInputChange}
				/>
				<label htmlFor="role" className="role">
					<InputRadio
						label="User"
						name="role"
						value="USER"
						checked={role === "USER"}
						onChange={onInputChange}
					/>
					<InputRadio
						label="Admin"
						name="role"
						value="ADMIN"
						checked={role === "ADMIN"}
						onChange={onInputChange}
					/>
				</label>
				<div className="buttons-container">
					<SubmitButton onSubmit={onSubmit} value="Submit" />
					<ResetButton onReset={onReset} value="Reset" />
				</div>
				<SuccessMessage success={success} />
				<ErrorMessages errors={errors} />
			</form>
		</div>
	);
}