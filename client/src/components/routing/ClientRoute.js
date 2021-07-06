import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const ClientRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, user } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : isAuthenticated && user.role.localeCompare("Client") === 0 ? (
          <Component {...props} />
        ) : (
          <></>
        )
      }
    />
  );
};

export default ClientRoute;
