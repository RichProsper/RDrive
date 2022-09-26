import { BrowserRouter as Router, withRouter, Switch } from "react-router-dom"
import Landing from "./pages/Landing";
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin";
import AllContexts from "./contexts/AllContexts"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import ErrorRoute from "./ErrorRoute";
import ResetPassword from "./pages/ResetPassword"
import Layout from "./components/layouts/Layout";

export default function App() {
    return (
        <Router>
            <AllContexts>                                    
                <Switch> {/* Switch Component ensures only one page is shown at a time */}
                    <PublicRoute exact path="/" component={withRouter(Landing)} />
                    <PrivateRoute path="/home" component={withRouter(Home)} />
                    <PrivateRoute exact path="/folder/:folderId" component={withRouter(Home)} />

                    <Layout>
                        <PublicRoute path="/signup" component={withRouter(Signup)} />
                        <PublicRoute path="/signin" component={withRouter(Signin)} />
                        <PublicRoute path="/reset-password" component={withRouter(ResetPassword)} />
                        {/* Catches all the invalid URLs and redirects to "/signin" */}
                        <ErrorRoute />
                    </Layout>
                </Switch>
            </AllContexts>
        </Router>
    )
}