import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateManageLink from "./pages/CreateManageLink";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import RedirectPage from "./pages/RedirectPage";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<CreateManageLink />
				</Route>
				<Route exact path="/signin">
					<SignIn />
				</Route>
				<Route exact path="/signup">
					<SignUp />
				</Route>
				<Route exact path="/notfound">
					<NotFound />
				</Route>
				<Route exact path="/:shortId">
					<RedirectPage />
				</Route>

				<Route exact path="*">
					<NotFound />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
