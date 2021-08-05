import React, { Fragment } from "react";
import Header from "../components/Header";
import art from "./../Assets/Images/Monster 404 Error-amico.png";

function NotFound() {
	return (
		<Fragment>
			<Header />
			<div className="container mt-5 text-center">
				<img className="img-fluid" src={art} alt="" />
			</div>{" "}
		</Fragment>
	);
}

export default NotFound;
