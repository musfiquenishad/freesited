import React from "react";
import logo from "./../Assets/Images/Qiee-white.png";

function Header() {
	return (
		<nav className="navbar navbar-light shadow-sm bg-dark">
			<div className="container">
				<a className="navbar-brand" href="/">
					<img
						src={logo}
						alt=""
						width="auto"
						height="40px"
						className="d-inline-block align-text-top"
					/>
				</a>

				<ul className="nav ml-auto justify-content-end">
					<li className="nav-item">
						<a
							href="/signin"
							type="button"
							className="btn btn-outline-warning btn-sm sign-in-button"
						>
							Sign In
						</a>
					</li>
					<li className="nav-item ml-2">
						<a
							href="/signup"
							type="button"
							className="btn btn-warning btn-sm sign-up-button"
						>
							Sign Up
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Header;
