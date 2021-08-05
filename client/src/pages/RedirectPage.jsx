import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

function RedirectPage() {
	let { shortId } = useParams();
	const [url, seturl] = useState("");
	const [urlAvailable, seturlAvailable] = useState(false);
	const [notfound, setnotfound] = useState(false);
	const history = useHistory();
	useEffect(() => {
		let isMounted = true; // note mutable flag

		axios
			.get(`api/users/urls/${shortId}`)
			.then(async (res) => {
				if (isMounted) {
					seturl(res.data[0].url);
					seturlAvailable(true);
				}
			})
			.catch((error) => {
				setnotfound(true);
				return <Redirect to="/notfound" />;
			});
		return () => {
			isMounted = false;
		};
	}, [shortId, history]);

	if (urlAvailable) {
		return window.location.replace(url);
	} else if (notfound) {
		console.log(notfound);
		history.push("/notfound");
	}
	return <div></div>;
}

export default RedirectPage;
