import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ component: Component, ...rest }) {
	const { user } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (user) {
					return <Component />;
				} else {
					return (
						<Redirect
							to={{ pathname: "/signin", state: { from: props.location } }}
						/>
					);
				}
			}}
		/>
	);
}

export default ProtectedRoute;
