import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { PrivateRoute, PublicRoute } from "./templates";
import { SignIn, Home, SignUp } from "./pages";

import { Provider } from "./Context";

function App() {
  return (
    <div className="App">
      <Provider>
        <Router>
          <Switch>
            <Route
              exact
              path="/signIn"
              component={() => <PublicRoute Component={SignIn} />}
            />
            <Route
              exact
              path="/signUp"
              component={() => <PublicRoute Component={SignUp} />}
            />
            <Route
              exact
              path="/"
              component={() => <PrivateRoute Component={Home} />}
            />
            <Redirect to="signIn" />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
