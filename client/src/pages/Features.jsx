import React, { Fragment } from "react";
import { Redirect } from "react-router";
import Header from "../components/Header";
import ScreenShot from "./../Assets/Images/screenshot.png";
import ScreenShot1 from "./../Assets/Images/screenshot1.png";
import ScreenShot2 from "./../Assets/Images/smartmockups_kt0eg4y2.jpg";
function Features(props) {
	if (localStorage.getItem("user")) {
		return props.location.state ? (
			<Redirect to={props.location.state.from.pathname} />
		) : (
			<Redirect to="/dashboard" />
		);
	}
	return (
		<Fragment>
			<Header />
			<div className="p-4"></div>
			<div className="px-4 pt-5 my-5 text-center border-bottom feature-holder">
				<h1 className="display-4 fw-bold">URL Shortener</h1>
				<div className="col-lg-6 mx-auto">
					<p className="lead mb-4">
						Managing links is even easier using the features available in the
						dashboard after logging in. Qiee makes link management easier than
						ever, and advanced analytics allow you to understand what is
						happening with your links - so you know what you can improve and get
						the highest click-through rate.
					</p>
					<div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
						<a href="/signup" className="btn btn-warning btn-lg ">
							Get Started
						</a>
						<a href="/signin" className="btn btn-outline-dark btn-lg ">
							Sign In
						</a>
					</div>
				</div>
				<div className="overflow-hidden">
					<div className="container px-5">
						<img
							src={ScreenShot}
							className="img-fluid border rounded-3 shadow-lg mb-4"
							alt="Hero section"
							width="700"
							height="500"
							loading="lazy"
						/>
					</div>
				</div>
			</div>

			<div className="container px-4 pt-5 my-5 text-center border-bottom">
				<div className="row align-items-center g-lg-5 py-5">
					<div className="col-lg-7 text-center text-lg-start">
						<h1 className="display-5 fw-bold lh-1 mb-3">
							Edit URL Alias Easily
						</h1>

						<p className="lead">
							Name your links with your own custom name. Links with a custom
							alias name are much more clickable and more readable than other
							links. Internet users trust more in url addresses that define the
							content / name of the link. This solution is more useful and
							significantly increases the click-through rates.
						</p>
					</div>
					<div className="col-md-10 mx-auto col-lg-5">
						<img
							src={ScreenShot1}
							className="img-fluid border rounded-3 shadow-lg mb-4"
							alt="Hero section"
							width="700"
							height="500"
							loading="lazy"
						/>
					</div>
				</div>
			</div>

			<div className="container px-4 pt-5 my-5 text-center ">
				<div className="row align-items-center g-lg-5 py-5">
					<div className="col-md-10 mx-auto col-lg-5">
						<img
							src={ScreenShot2}
							className="img-fluid border rounded-3  mb-4"
							alt="Hero section"
							width="700"
							height="500"
							loading="lazy"
						/>
					</div>
					<div className="col-lg-7 text-center text-lg-start">
						<h1 className="display-5 fw-bold lh-1 mb-3">
							Share Link with QR Code
						</h1>

						<p className="lead">
							QR code QR code generator for each short link QR codes allow you
							to easily obtain clicks on our links from printed materials,
							flyers, billboards, etc. In cuttly, we automatically generate a QR
							code for each shortened link.
						</p>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Features;
