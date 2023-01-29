import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { userLoginService } from "./services";

const Login = () => {
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const userLoginHandler = (event: any) => {
    event.preventDefault();
    const userData = { email, password };
    userLoginService(userData)
      .then((response) => {
        authCtx.login(response.data.accessToken);
        localStorage.setItem("userId", response.data.user.id);
        navigate("/tasks");
      })
      .catch(() => alert("Invalid Login"));
  };

  const navigateToUserRegistrationHandler = () => {
    navigate("/register");
  };

  return (
    <form className="ms" onSubmit={userLoginHandler}>
      <h3 className="text-center">User Login</h3>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Valid Email"
          value={email}
          onChange={(event) => setUserEmail(event.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Valid Password"
          value={password}
          onChange={(event) => setUserPassword(event.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
      <button
        type="submit"
        className="btn btn-primary mx-2"
        onClick={navigateToUserRegistrationHandler}
      >
        Sign Up
      </button>
    </form>
  );
};

export default Login;
