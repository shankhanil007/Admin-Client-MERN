import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import AdminRoute from "./components/routing/AdminRoute";
import ClientRoute from "./components/routing/ClientRoute";
import Alert from "./components/layout/Alerts";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import Student from "./components/student/Student";
import Teacher from "./components/teacher/Teacher";

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <AdminRoute
                  exact
                  path="/teacher/dashboard"
                  component={Teacher}
                />
                <ClientRoute
                  exact
                  path="/student/dashboard"
                  component={Student}
                />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
