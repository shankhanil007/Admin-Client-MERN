import React, { useState, useContext, useEffect } from "react";
import GoogleLogin from "react-google-login";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { registerAdmin, registerClient, error, clearErrors, isAuthenticated } =
    authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "User already exists") {
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "Admin",
  });

  const { name, email, password, password2, role } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
    } else if (password !== password2) {
    } else {
      if (role.localeCompare("Admin") === 0) {
        registerAdmin({
          name,
          email,
          password,
          role,
        });
      } else if (role.localeCompare("Client") === 0) {
        registerClient({
          name,
          email,
          password,
          role,
        });
      }
    }
  };

  const onLoginSuccess = (res) => {
    if (role.localeCompare("Admin") === 0) {
      registerAdmin({
        name: res.profileObj.givenName.concat(res.profileObj.familyName),
        email: res.profileObj.email,
        password: "GooglePassword",
        role: "Admin",
      });
    } else if (role.localeCompare("Client") === 0) {
      registerClient({
        name: res.profileObj.givenName.concat(res.profileObj.familyName),
        email: res.profileObj.email,
        password: "GooglePassword",
        role: "Client",
      });
    }
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  const RegisterForm = {
    maxWidth: "500px",
    padding: "15px",
    margin: "auto",
    marginTop: "50px",
  };

  return (
    <div style={RegisterForm}>
      <h1 style={{ textAlign: "center" }}>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            class="form-control"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            class="form-control"
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            class="form-control"
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            class="form-control"
            id="password2"
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={onChange}
          name="role"
        >
          <option value="Admin">Admin</option>
          <option value="Client">Client</option>
        </select>
        <button type="submit" className="btn btn-primary mt-3" value="Register">
          Register
        </button>
      </form>
      <GoogleLogin
        clientId=""
        buttonText="Sign Up with Google"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
        className="mt-3"
      />
    </div>
  );
};

export default Register;
