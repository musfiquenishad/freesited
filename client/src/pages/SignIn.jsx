import React, { useState } from "react";
import Logo from "./../Assets/Images/Qiee.png";
import axios from "axios";

function SignIn() {
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [validation, setvalidation] = useState("");
	const [loading, setloading] = useState("");

	function handleSubmit(event) {
		event.preventDefault();
		setloading(true);

		if (email === "") {
			setvalidation("is-invalid");
			setloading(false);
		} else if (password === "") {
			setvalidation("is-invalid");
			setloading(false);
		} else {
			axios
				.post("api/users/signin", { email, password })
				.then((res) => {
					if (res.status === 200 && res.data.authorized) {
						setloading(false);
						setemail("");
						setpassword("");
						setvalidation("");
						console.log(res.data.token);
					} else {
						setvalidation("is-invalid");
						setloading(false);
					}
				})
				.catch((error) => {
					console.log(error.message);
					setvalidation("is-invalid");
					setloading(false);
				});
		}
	}

	return (
		<div className="sign-in">
			<main className="form-signin">
				<form onSubmit={handleSubmit}>
					<div className="logo text-center">
						<img className="mb-4 " src={Logo} alt="" width="auto" height="57" />

						<h1 className="h3 mb-3 fw-normal">Please sign in</h1>
					</div>
					<label htmlFor="inputEmail" className="visually-hidden">
						Email address
					</label>
					<input
						type="email"
						id="inputEmail"
						className={`form-control ${validation}`}
						placeholder="Email address"
						required
						autoFocus
						value={email}
						onChange={(event) => {
							setemail(event.target.value);
							setvalidation("");
						}}
					/>
					<label htmlFor="inputPassword" className="visually-hidden">
						Password
					</label>
					<input
						type="password"
						id="inputPassword"
						className={`form-control ${validation}`}
						placeholder="Password"
						required
						value={password}
						onChange={(event) => {
							setpassword(event.target.value);
							setvalidation("");
						}}
					/>

					<div className="invalid-feedback mb-3">Incorrect credentials!</div>
					<div className="checkbox mb-3 ">
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id="flexCheckDefault"
							/>
							<label className="form-check-label" htmlFor="flexCheckDefault">
								Remember me
							</label>
						</div>
					</div>
					{loading ? (
						<button
							className="w-100 btn btn-lg btn-dark"
							type="submit"
							disabled
						>
							Loading ...
						</button>
					) : (
						<button className="w-100 btn btn-lg btn-dark" type="submit">
							Sign in
						</button>
					)}

					<p className="mt-3 mb-3 text-muted text-center">
						Don't have an account? <a href="/signup">Sign Up</a>
					</p>
				</form>
			</main>
		</div>
	);
}

export default SignIn;
