import React, { useState, useEffect } from "react";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import qr from "./../Assets/Images/qrcode.png";
import QRCode from "qrcode.react";
import moment from "moment";
import nodata from "./../Assets/Images/3973481.jpg";

function ManageLinkTable() {
	const [data, setdata] = useState([]);
	const [url, seturl] = useState("");
	const [shorturl, setshorturl] = useState("");
	const [shorturlloading, setshorturlloading] = useState(false);
	const [urlAvailable, seturlAvailable] = useState(false);
	const [copied, setcopied] = useState(false);
	const [btnindex, setbtnindex] = useState("");
	const [copied2, setcopied2] = useState(false);
	const [validation, setvalidation] = useState("");
	const [aliasvalidation, setaliasvalidation] = useState("");
	const [aliasvalidationnotice, setaliasvalidationnotice] = useState("");
	const [alias, setalias] = useState("");
	const [deleteurlid, setdeleteurlid] = useState("");
	const [editurlid, setediturlid] = useState("");
	const [changessaved, setchangessaved] = useState(false);
	const specialCharacters = /[!@#$%^&*()+=[\]{};':"\\|,<>/?]+/;
	const protocolTest = /^https?:\/\//gi;
	const [loading, setloading] = useState(false);
	const [gettingData, setgettingData] = useState(false);

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
		setloading(true);

		if (url.indexOf(" ") >= 0) {
			setvalidation("is-invalid invalid-feedback");
			seturl("The provided link is incorrect");
			setloading(false);
		} else if (!validURL(url)) {
			setvalidation("is-invalid");
			setloading(false);
		} else if (!protocolTest.test(url)) {
			setloading(false);
			seturl(`http://${url}`);
		} else {
			axios
				.post(
					"api/users/urls/create-url",
					{
						longUrl: url,
					},

					{ withCredentials: true }
				)
				.then((res) => {
					seturl(`https://freesited.herokuapp.com/${res.data.url.shortUrl}`);
					seturlAvailable(true);
					setloading(false);
					setdata((prevData) => {
						return [res.data.url, ...prevData];
					});
				})
				.catch((error) => {
					console.log(error);
					setloading(false);
				});
		}
	}

	useEffect(() => {
		setgettingData(true);
		let isMounted = true;
		axios
			.get("api/users/urls", { withCredentials: true })
			.then((response) => {
				if (isMounted) {
					setdata(response.data);
					setgettingData(false);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		return () => {
			isMounted = false;
		};
	}, [changessaved]);

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
								setloading(false);
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
						) : loading ? (
							<button
								className="input-group-text btn btn-dark"
								id="create-input-group"
								type="button"
								disabled
							>
								Shortening
							</button>
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

			{gettingData ? (
				<div className="d-flex justify-content-center mt-5 pt-5">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : data.length === 0 ? (
				<div className="text-center mt-5 mb-5">
					<img
						className="desktop-view "
						width="auto"
						height="500"
						src={nodata}
						alt="No data available"
					/>
					<img
						className="mobile-view img-fluid"
						src={nodata}
						alt="No data available"
					/>
				</div>
			) : (
				<div className="list-group">
					{data &&
						data.map((url, index) => {
							return (
								<div
									key={index}
									className="list-group-item  d-flex gap-3 py-3"
									aria-current="true"
								>
									<img
										src={qr}
										alt="qr code"
										width="32"
										height="32"
										className="flex-shrink-0"
										data-bs-toggle="modal"
										data-bs-target="#qrcodeModal"
										onClick={(event) => {
											setshorturlloading(true);

											axios
												.get(`api/urls/${url._id}`, {
													withCredentials: true,
												})
												.then((surl) => {
													setshorturl(surl.data[0].shortUrl);
													setshorturlloading(false);
												})
												.catch((error) => {
													console.log(error);
												});
										}}
									/>

									<div className="d-flex gap-2 w-100 justify-content-between">
										<div>
											<h6 className="mb-0 text-break">
												{`freesited.com/${url.shortUrl}  `}
												<CopyToClipboard
													onCopy={() => {
														setcopied2(true);
														setbtnindex(index);
														setTimeout(() => {
															setcopied2(false);
														}, 2000);
													}}
													text={`https://freesited.herokuapp.com/${url.shortUrl}`}
												>
													<button className="copy-button ">
														{copied2 && btnindex === index ? (
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																fill="currentColor"
																className="bi bi-check-all"
																viewBox="0 0 16 16"
															>
																<path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
															</svg>
														) : (
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
															</svg>
														)}
													</button>
												</CopyToClipboard>
											</h6>

											<p className="mb-0 opacity-75 text-break">
												{url.longUrl}
											</p>
											<hr />
											<div className="badges">
												<span className="badge bg-success me-3">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														className="bi bi-bar-chart-fill"
														viewBox="0 0 16 16"
													>
														<path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
													</svg>{" "}
													<strong>{url.clicks + " Clicks"}</strong>
												</span>
												<span className="badge bg-warning p-2">
													{moment(url.createdAt).fromNow()}
												</span>
											</div>
										</div>

										<div className="dropdown">
											<button
												className="three-dot-button"
												type="button"
												id="dropdownMenuButton1"
												data-bs-toggle="dropdown"
												aria-expanded="false"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													className="bi bi-three-dots-vertical"
													viewBox="0 0 16 16"
												>
													<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
												</svg>
											</button>
											<ul
												className="dropdown-menu "
												aria-labelledby="dropdownMenuButton1"
											>
												<li>
													<CopyToClipboard
														text={`https://freesited.herokuapp.com/${url.shortUrl}`}
													>
														<button className="dropdown-item">
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
															Copy short URL
														</button>
													</CopyToClipboard>
												</li>
												<li>
													<CopyToClipboard text={url.longUrl}>
														<button className="dropdown-item">
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
															Copy Original URL
														</button>
													</CopyToClipboard>
												</li>
												<li>
													<button
														className="dropdown-item"
														data-bs-toggle="modal"
														data-bs-target="#editalias"
														onClick={(event) => {
															setediturlid(url._id);
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															className="bi bi-pen"
															viewBox="0 0 16 16"
														>
															<path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
														</svg>{" "}
														Edit alias
													</button>
												</li>
												<li>
													<button
														className="dropdown-item"
														data-bs-toggle="modal"
														data-bs-target="#deleteConfirm"
														onClick={(event) => {
															setdeleteurlid(url._id);
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															className="bi bi-trash"
															viewBox="0 0 16 16"
														>
															<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
															<path
																fillRule="evenodd"
																d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
															/>
														</svg>{" "}
														Delete
													</button>
												</li>
											</ul>

											<div
												className="modal fade "
												id="editalias"
												tabIndex="-1"
												aria-labelledby="editaliasModalLabel"
											>
												<div
													className="modal-dialog modal-dialog-centered"
													role="document"
												>
													<div className="modal-content rounded-6 shadow p-4">
														<div className="modal-header border-bottom-0">
															<h5 className="modal-title">Edit URL Alias</h5>
															<button
																type="button"
																className="btn-close"
																data-bs-dismiss="modal"
																aria-label="Close"
																onClick={(event) => {
																	setalias("");
																	setaliasvalidation("");
																	setchangessaved(false);
																}}
															></button>
														</div>
														<div className="modal-body py-0 pb-0 p">
															<div className="form-floating mb-1 mt-2">
																<input
																	type="text"
																	className={`form-control rounded-4 ${aliasvalidation}`}
																	placeholder="Url alias"
																	required
																	value={alias}
																	onChange={(event) => {
																		setalias(event.target.value);
																		setaliasvalidation("");

																		setchangessaved(false);
																	}}
																/>
																<label>Type your url alias</label>
																<div className="invalid-feedback mt-2 ms-2">
																	{aliasvalidationnotice}
																</div>
															</div>
														</div>
														<div className="modal-footer flex-column border-top-0 pb-3">
															{changessaved ? (
																<button
																	className="w-100 mb-2 btn btn-lg rounded-4 btn-success"
																	type="button"
																	disabled
																>
																	Changes Saved
																</button>
															) : (
																<button
																	className="w-100 mb-2 btn btn-lg rounded-4 btn-dark"
																	type="button"
																	onClick={async (event) => {
																		const aliasAvailable = await axios.get(
																			`api/aliasavailablity/${alias}`
																		);

																		if (alias.indexOf(" ") >= 0) {
																			setaliasvalidation("is-invalid");
																			setaliasvalidationnotice(
																				"Alias Can't contain space!"
																			);
																		} else if (specialCharacters.test(alias)) {
																			setaliasvalidation("is-invalid");
																			setaliasvalidationnotice(
																				"Alias can't contain special Characters!"
																			);
																		} else if (!aliasAvailable.data.available) {
																			setaliasvalidation("is-invalid");
																			setaliasvalidationnotice(
																				"Url alias is unavailable, Please use something else!"
																			);
																		} else {
																			axios
																				.put(
																					`api/users/urls/${editurlid}`,
																					{ alias },
																					{
																						withCredentials: true,
																					}
																				)
																				.then((res) => {
																					setaliasvalidation("is-valid");
																					setchangessaved(true);
																				})
																				.catch((error) => {
																					setaliasvalidation("is-invalid");
																					setaliasvalidationnotice(
																						"URL alias unavailable!"
																					);
																				});
																		}
																	}}
																>
																	Save Changes
																</button>
															)}
														</div>
													</div>
												</div>
											</div>

											<div
												className="modal fade "
												id="deleteConfirm"
												tabIndex="-1"
												aria-labelledby="deleteConfirmModalLabel"
											>
												<div
													className="modal-dialog modal-dialog-centered delete-confirm-modal"
													role="document"
												>
													<div className="modal-content rounded-4 shadow">
														<div className="modal-body p-4 text-center">
															<h5 className="mb-0">
																Are you sure you want to delete?
															</h5>
															<p className="mb-0">
																Url can't be retrieved after deleting
															</p>
														</div>
														<div className="modal-footer flex-nowrap p-0">
															<button
																type="button"
																name={url._id}
																data-bs-dismiss="modal"
																className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
																onClick={(event) => {
																	axios
																		.delete(`api/users/urls/${deleteurlid}`, {
																			withCredentials: true,
																		})
																		.then((res) => {
																			setdata((prevUrl) => {
																				return prevUrl.filter(
																					(deleteurlindexid, index) => {
																						return (
																							deleteurlindexid._id !==
																							deleteurlid
																						);
																					}
																				);
																			});
																		})
																		.catch((error) => {
																			console.log(error);
																		});
																}}
															>
																<strong>Yes, Delete</strong>
															</button>
															<button
																type="button"
																className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0"
																data-bs-dismiss="modal"
															>
																No thanks
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div
										className="modal fade"
										id="qrcodeModal"
										tabIndex="-1"
										aria-labelledby="qrcodeModalLabel"
									>
										<div
											className="modal-dialog modal-dialog-centered"
											role="document"
										>
											<div className="modal-content rounded-6 shadow">
												<div className="modal-body p-5 text-center">
													<h2 className="fw-bold mb-5">Scan QR code!</h2>
													{shorturlloading ? (
														<div className="d-flex justify-content-center mt-5 mb-5 pt-5 pb-5">
															<div className="spinner-border" role="status">
																<span className="visually-hidden">
																	Loading...
																</span>
															</div>
														</div>
													) : (
														<QRCode
															size={270}
															value={`https://freesited.herokuapp.com/${shorturl}`}
														/>
													)}
													<button
														type="button"
														className="btn btn-lg btn-dark mt-5 w-100 mt-3"
														data-bs-dismiss="modal"
													>
														Great, thanks!
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			)}
		</div>
	);
}

export default ManageLinkTable;
