import { BrowserRouter as Router, withRouter, Switch } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin";
import AllContexts from "./contexts/AllContexts"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import ResetPassword from "./pages/ResetPassword"

export default function App() {
    return (
        <Router>
            <AllContexts>                                    
                <Switch> {/* Switch Component ensures only one page is shown at a time */}
                    <PrivateRoute exact path="/" component={withRouter(Home)} />
                    <PublicRoute path="/signup" component={withRouter(Signup)} />
                    <PublicRoute path="/signin" component={withRouter(Signin)} />
                    <PublicRoute path="/reset-password" component={withRouter(ResetPassword)} />
                </Switch>
            </AllContexts>
        </Router>
    )
}