import React, { Fragment } from "react";
import notfound from "./../Assets/Images/Monster 404 Error-amico.png";
import { useHistory } from "react-router-dom";

function NotFound() {
	const history = useHistory();

	return (
		<Fragment>
			<div className="container">
				<div className="px-4 py-5 my-5 text-center">
					<img
						className="d-block mx-auto mb-4"
						src={notfound}
						alt=""
						width="auto"
						height="300"
					/>
					<h1 className="display-5 fw-bold notfound-title">404 NOT FOUND</h1>
					<div className="col-lg-6 mx-auto">
						<p className="lead mb-4">
							We're deeply sorry, but something went wrong. Please try to
							refresh the page or start over.
						</p>
						<div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
							<button
								type="button"
								className="btn btn-dark btn-lg px-4 gap-3"
								onClick={() => {
									history.goBack();
								}}
							>
								Go Back
							</button>
							<a href="/" className="btn btn-warning btn-lg px-4">
								Go Home
							</a>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default NotFound;
