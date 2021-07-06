import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import axios from "axios";

const AdminRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, user } = authContext;
  const [role, setRole] = useState("");

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : role.localeCompare("Admin") == 0 ? (
          <Component {...props} />
        ) : (
          <> </>
        )
      }
    />
  );
};

export default AdminRoute;
