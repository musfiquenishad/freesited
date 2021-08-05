import React, { useState } from "react";
import Logo from "./../Assets/Images/Qiee.png";
import axios from "axios";

function SignUp() {
	const [fullname, setfullname] = useState("");
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");
	const [loading, setloading] = useState(false);

	const [nameValidation, setnameValidation] = useState("");
	const [emailValidation, setemailValidation] = useState("");
	const [passwordValidation, setpasswordValidation] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		setloading(true);

		const emailAvailable = await axios.post(`api/users?email=${email}`);
		if (fullname === "") {
			setnameValidation("is-invalid");
			setloading(false);
		} else if (!emailAvailable.data.available) {
			setloading(false);
			setemailValidation("is-invalid");
		} else if (confirmPassword !== password) {
			setpasswordValidation("is-invalid");
			setloading(false);
		} else {
			axios
				.post("api/users/signup", { fullname, email, password })
				.then((res) => {
					if (res.status === 201 && res.data.authorized) {
						setfullname("");
						setemail("");
						setpassword("");
						setconfirmPassword("");
						setnameValidation("");
						setemailValidation("");
						setpasswordValidation("");
						setloading(false);
						console.log(res.data.token);
					}
				})
				.catch((error) => {
					console.log(error.message);
					setloading(false);
				});
		}
	}
	return (
		<div className="sign-up-holder">
			<main className="form-signup">
				<form onSubmit={handleSubmit}>
					<div className="logo text-center">
						<img className="mb-5 " src={Logo} alt="" width="auto" height="57" />

						<h1 className="h3 mb-5 fw-normal">Signup to create short URL</h1>
					</div>
					<div className="inputs">
						<div className="row mb-3">
							<div className="col full-name">
								<input
									className={`form-control form-control-lg ${nameValidation}`}
									type="text"
									placeholder="Full Name"
									aria-label="Full Name"
									onChange={(event) => {
										setfullname(event.target.value);
									}}
									required
									value={fullname}
								/>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col">
								<input
									className={`form-control form-control-lg ${emailValidation}`}
									type="email"
									placeholder="Email"
									aria-label="Email"
									onChange={(event) => {
										setemail(event.target.value);
										setemailValidation("");
									}}
									required
									value={email}
								/>
								<div className="invalid-feedback">
									Email already exists in database please use another one or
									sign in
								</div>
							</div>
						</div>

						<div className="row mb-3">
							<div className="col">
								<input
									className={`form-control form-control-lg ${passwordValidation}`}
									type="password"
									placeholder="Password"
									aria-label="Password"
									onChange={(event) => {
										setpassword(event.target.value);
										setpasswordValidation("");
									}}
									required
									value={password}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col">
								<input
									className={`form-control form-control-lg ${passwordValidation}`}
									type="password"
									placeholder="Confirm Password"
									aria-label="Confirm Password"
									onChange={(event) => {
										setconfirmPassword(event.target.value);
										setpasswordValidation("");
									}}
									required
									value={confirmPassword}
								/>
								<div className="invalid-feedback">
									Password and confirm password doesn't match!
								</div>
							</div>
						</div>
						{loading ? (
							<button className="w-100 btn btn-lg btn-dark" disabled>
								Loading...
							</button>
						) : (
							<button className="w-100 btn btn-lg btn-dark" type="submit">
								Sign Up
							</button>
						)}
					</div>

					<p className="mt-3 mb-3 text-muted text-center">
						Already have an account? <a href="/signin">Sign In</a>
					</p>
				</form>
			</main>
		</div>
	);
}

export default SignUp;
