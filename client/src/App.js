import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateManageLink from "./pages/CreateManageLink";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Redirect from "./pages/Redirect";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Features from "./pages/Features";
import { AuthContext } from "./components/AuthContext";
function App() {
	const [user, setuser] = useState(false);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			setuser(localStorage.getItem("user"));
		}
		return () => {
			mounted = false;
		};
	}, []);

	var oneYearFromNow = new Date().getFullYear() + 1;
	console.log(oneYearFromNow);
	return (
		<Router>
			<AuthContext.Provider value={{ user, setuser }}>
				<Switch>
					<ProtectedRoute
						exact
						path="/dashboard"
						component={CreateManageLink}
					/>

					<Route exact path="/" component={Features} />
					<Route exact path="/signin" component={SignIn} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/notfound">
						<NotFound />
					</Route>
					<Route exact path="/:shortId">
						<Redirect />
					</Route>

					<Route exact path="*">
						<NotFound />
					</Route>
				</Switch>
			</AuthContext.Provider>
		</Router>
	);
}

export default App;
