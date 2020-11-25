import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { PrivateRoute, PublicRoute } from "./templates";
import { SignIn, Home, SignUp } from "./pages";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { Provider } from "./Context";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6ec6ff",
      main: "#2196f3",
      dark: "#0069c0",
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
