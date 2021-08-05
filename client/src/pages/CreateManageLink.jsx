import React, { Fragment } from "react";
import ManageLinkTable from "../components/ManageLinkTable";
import Header from "./../components/Header";

function CreateManageLink() {
	return (
		<Fragment>
			<Header />

			<ManageLinkTable />
		</Fragment>
	);
}

export default CreateManageLink;
