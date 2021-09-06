import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import ManageLinkTable from "../components/ManageLinkTable";
import Header from "./../components/Header";

function CreateManageLink() {
	if (!localStorage.getItem("user")) {
		<Redirect to="/" />;
	}
	return (
		<Fragment>
			<Header />

			<ManageLinkTable />
		</Fragment>
	);
}

export default CreateManageLink;
