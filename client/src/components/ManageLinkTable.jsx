import React, { useState, useEffect } from "react";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import LinkCard from "./LinkCard";

function ManageLinkTable() {
	const [data, setdata] = useState([]);
	const [url, seturl] = useState("");
	const [urlAvailable, seturlAvailable] = useState(false);
	const [copied, setcopied] = useState(false);
	const [validation, setvalidation] = useState("");
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTAzYjFmYjBiMmQ1NDM2Y2NjNTc3NjQiLCJlbWFpbCI6ImFoc2FubmlzaGFkQGdtYWlsLmNvbSIsImlhdCI6MTYyNzY0MTg0NCwiZXhwIjoxNjI4MjQ2NjQ0fQ.VWy2neFZx4G9I8NvY5KpdBV0GBpDnKly1g-BQshSwwc";

	function validURL(str) {
		var pattern = new RegExp(
			"^(https?:\\/\\/)?" + // protocol
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
				"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
				"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
				"(\\#[-a-z\\d_]*)?$",
			"i"
		); // fragment locator
		return !!pattern.test(str);
	}
	function handleSubmit(event) {
		event.preventDefault();

		if (url.indexOf(" ") >= 0) {
			setvalidation("is-invalid invalid-feedback");
			seturl("The provided link is incorrect");
		} else if (!validURL(url)) {
			setvalidation("is-invalid");
		} else {
			axios
				.post(
					"api/users/urls",
					{
						url,
					},
					{
						headers: {
							Authorization: `Basic ${token}`,
						},
					}
				)
				.then((res) => {
					seturl(`http://localhost:3000/${res.data.url.short}`);
					seturlAvailable(true);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	useEffect(() => {
		axios
			.get("api/users/urls", {
				headers: {
					Authorization: `Basic ${token}`,
				},
			})
			.then((response) => {
				setdata(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [url, data]);

	return (
		<div className="container">
			<div className=" container-fluid text-center create-link-form-holder">
				<form className="create-link-form" onSubmit={handleSubmit}>
					<div className="input-group mb-3 p-3 bg-light shadow-lg rounded ">
						<input
							type="text"
							className={`form-control form-control-lg ${validation}`}
							placeholder="Paste Long URL and shorten it"
							aria-label="Paste Long URL and shorten it"
							aria-describedby="create-input-group"
							value={url}
							onChange={(event) => {
								seturl(event.target.value);
								setvalidation("");
								seturlAvailable(false);
							}}
							required
						/>

						{urlAvailable ? (
							<CopyToClipboard
								onCopy={() => {
									setcopied(true);
									setTimeout(() => {
										setcopied(false);
									}, 2000);
								}}
								text={url}
							>
								{copied ? (
									<button
										className="input-group-text btn btn-success"
										id="create-input-group"
										type="button"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-clipboard-check"
											viewBox="0 0 16 16"
										>
											<path
												fillRule="evenodd"
												d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
											/>
											<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
											<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
										</svg>{" "}
										Copied
									</button>
								) : (
									<button
										className="input-group-text btn btn-success"
										id="create-input-group"
										type="button"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-clipboard"
											viewBox="0 0 16 16"
										>
											<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
											<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
										</svg>{" "}
										copy
									</button>
								)}
							</CopyToClipboard>
						) : (
							<button
								className="input-group-text btn btn-dark"
								id="create-input-group"
								type="submit"
							>
								Shorten
							</button>
						)}
					</div>
				</form>
			</div>

			<div className="urls-table-holder  container-fluid">
				<table className="urls-table table table-borderless">
					<tbody>
						{data.map((url, index) => {
							return (
								<LinkCard
									id={url._id}
									key={index}
									shorturl={url.short}
									longurl={url.url}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ManageLinkTable;
