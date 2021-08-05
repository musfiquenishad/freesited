import React from "react";
import QRCode from "qrcode.react";
import qr from "./../Assets/Images/qrcode.png";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";

function LinkCard(props) {
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTAzYjFmYjBiMmQ1NDM2Y2NjNTc3NjQiLCJlbWFpbCI6ImFoc2FubmlzaGFkQGdtYWlsLmNvbSIsImlhdCI6MTYyNzY0MTg0NCwiZXhwIjoxNjI4MjQ2NjQ0fQ.VWy2neFZx4G9I8NvY5KpdBV0GBpDnKly1g-BQshSwwc";

	return (
		<tr className="link-table-row shadow-sm mb-3">
			<td className="p-4 align-middle">
				<img
					src={qr}
					alt="qr code"
					width="50px"
					data-bs-toggle="modal"
					data-bs-target="#qrcodeModal"
				/>

				<div
					className="modal fade"
					id="qrcodeModal"
					tabIndex="-1"
					aria-labelledby="qrcodeModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content text-center">
							<div class="modal-header ">
								<h5 class="modal-title" id="exampleModalLabel">
									Scan qr code
								</h5>
								<button
									type="button"
									class="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
							</div>
							<div className="modal-body text-center align-middle">
								<QRCode
									size={180}
									value={`http://192.168.31.69:3000/${props.shorturl}`}
								/>
							</div>
							<div class="modal-footer">
								<button
									type="button"
									class="btn btn-dark"
									data-bs-dismiss="modal"
								>
									Ok
								</button>
							</div>
						</div>
					</div>
				</div>
			</td>
			<td className=" align-middle pt-3">
				<h5 className="text-break">
					<a href={`/${props.shorturl}`}>{`qiee.co/${props.shorturl}`}</a>
				</h5>
				<p className="text-break">{props.longurl.substring(0, 40) + "...."}</p>
			</td>
			<td className="p-3 align-middle text-end">
				<button
					className="btn btn-light three-dot-button"
					id="dropdownMenuButton"
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
				<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<li>
						<CopyToClipboard text={`https://qiee.co/${props.shorturl}`}>
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
								Copy
							</button>
						</CopyToClipboard>
					</li>
					<li>
						<button className="dropdown-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-pencil"
								viewBox="0 0 16 16"
							>
								<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
							</svg>{" "}
							Change url alias
						</button>
					</li>
					<li>
						<button className="dropdown-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-share"
								viewBox="0 0 16 16"
							>
								<path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
							</svg>{" "}
							Share
						</button>
					</li>
					<li>
						<button
							className="dropdown-item"
							onClick={(event) => {
								if (
									window.confirm(
										`Are You Sure You Want to Delete https://qiee.co/${props.shorturl} ?`
									)
								) {
									axios
										.delete(`api/users/urls/${props.id}`, {
											headers: {
												Authorization: `Basic ${token}`,
											},
										})
										.then((res) => {
											console.log(res);
										})
										.catch((error) => {
											console.log(error);
										});
								}
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
			</td>
		</tr>
	);
}

export default LinkCard;
