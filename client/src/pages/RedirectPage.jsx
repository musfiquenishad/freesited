import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function RedirectPage() {
	let { shortId } = useParams();
	const [url, seturl] = useState("");
	const [urlAvailable, seturlAvailable] = useState(false);
	const [notfound, setnotfound] = useState(false);
	const history = useHistory();

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			axios
				.get(`api/users/urls/redirect/${shortId}`)
				.then(async (res) => {
					seturl(res.data.longUrl);
					seturlAvailable(true);
					return null;
				})
				.catch((error) => {
					setnotfound(true);
				});
		}
		return () => {
			isMounted = false;
		};
	}, [shortId, history]);

	if (urlAvailable) {
		return window.location.replace(url);
	} else if (notfound) {
		return history.push("/notfound");
	}

	return <div></div>;
}

export default RedirectPage;
