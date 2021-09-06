import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import art from "./../Assets/Images/Monster 404 Error-amico.png";

function Redirect() {
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
				<div className="container mt-5 text-center">
					<img className="img-fluid" src={art} alt="404 Notfound" />
				</div>
			</Fragment>
		);
	}

	return <div></div>;
}

export default Redirect;
