import React, { useContext } from "react";
import logo from "./../Assets/Images/freesited.png";
import axios from "axios";
import { AuthContext } from "./AuthContext";

function Header() {
	const { user, setuser } = useContext(AuthContext);

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

				{user ? (
					<div className="dropdown ">
						<a
							className="nav-link dropdown-toggle menu-dropdown header-avatar"
							href="/dashboard"
							role="button"
							id="dropdownMenuLink"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-person-circle"
								viewBox="0 0 16 16"
							>
								<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
								<path
									fillRule="evenodd"
									d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
								/>
							</svg>
						</a>

						<ul
							className="dropdown-menu dropdown-menu-end"
							aria-labelledby="dropdownMenuLink"
						>
							{/* <li>
								<span className="dropdown-item">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-person"
										viewBox="0 0 16 16"
									>
										<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
									</svg>{" "}
									{localStorage.getItem("user")}
								</span>
							</li> */}
							<li>
								<a className="dropdown-item" href="/dashboard">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-house-door"
										viewBox="0 0 16 16"
									>
										<path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
									</svg>{" "}
									Dashboard
								</a>
							</li>

							<hr className="dropdown-divider" />

							<li>
								<button
									className="dropdown-item"
									onClick={(event) => {
										axios
											.post("api/users/signout")
											.then((res) => {
												if (res.status === 200 && res.data.signedout) {
													localStorage.removeItem("user");
													setuser(false);
												}
											})
											.catch((error) => {
												console.log(error);
											});
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-box-arrow-in-left"
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"
										/>
										<path
											fillRule="evenodd"
											d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
										/>
									</svg>{" "}
									Logout
								</button>
							</li>
						</ul>
					</div>
				) : null}
			</div>
		</nav>
	);
}

export default Header;
