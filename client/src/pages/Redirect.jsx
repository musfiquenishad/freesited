import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import art from "./../Assets/Images/Monster 404 Error-amico.png";

function Redirect() {
	const history = useHistory();
	let { shortId } = useParams();
	const [url, seturl] = useState(null);
	const [brokenId, setbrokenId] = useState(false);
	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			axios
				.get(`api/users/urls/redirect/${shortId}`)
				.then((res) => {
					seturl(res.data.longUrl);
				})
				.catch((error) => {
					setbrokenId(true);
				});
		}

		return () => {
			isMounted = false;
		};
	}, [shortId]);

	if (url) {
		return <div>{window.location.replace(url)}</div>;
	} else if (brokenId) {
		return (
			<Fragment>
				<Header />
				<div className="container">
					<div className="px-4 pb-4 my-5 text-center">
						<img
							className="d-block mx-auto mb-4"
							src={art}
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

	return <div></div>;
}

export default Redirect;
