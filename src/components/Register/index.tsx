import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegisterService } from "./services";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  

  const navigate = useNavigate();

  const userRegisterHandler = (event: any) => {
    event.preventDefault();
    const userData = { email, password, username};
    userRegisterService({...userData, tasks: []})
      .then(() => {
        navigate("/login");
      })
      .catch(() => alert("Invalid Register"));
  };
  const handleBackToLoginPage = () => {
    navigate("/login");
  };

  return (
    <form className="ms" onSubmit={userRegisterHandler}>
        <h3 className="text-center">User Sign up</h3>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Valid Username"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
          required
        />
      </div>
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
        Sign Up
      </button>
      <button
        type="submit"
        className="btn btn-primary mx-2"
        onClick={handleBackToLoginPage}
      >
        I have account
      </button>
    </form>
  );
};

export default Register;
