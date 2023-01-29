import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthContext from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";

function App() {
  const authCtx = useContext(AuthContext);

  const isuserLoggedIn = authCtx.isLoggedIn;
  return (
    <>
      <Navbar />
      <div className="container mb-5">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isuserLoggedIn && <Route path="/tasks" element={<Tasks />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
