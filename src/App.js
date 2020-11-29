import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { PrivateRoute, PublicRoute } from "./templates";
import { SignIn, Home, SignUp, ForgotPassword, Profile, Post } from "./pages";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { Provider } from "./contexts/Context";

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
                path="/whereismypassword"
                component={() => <PublicRoute Component={ForgotPassword} />}
              />
              <Route
                exact
                path="/profile/:q"
                component={() => <PrivateRoute Component={Profile} />}
              />

              <Route
                exact
                path="/post/:id"
                component={() => <PrivateRoute Component={Post} />}
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
