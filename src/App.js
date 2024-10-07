import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./routes/LoginAdmin";
import AdminDashboard from "./routes/AdminDashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { login } from "./services/authServices";

function App() {
  let [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const email = window.localStorage.getItem("email");
      const password = window.localStorage.getItem("password");
      //REST API respone
      const response = await login(email, password);
      console.log(response);
      if (response.status === 200) {
        setUser(response.data.username);
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("password", password);
      }
    })();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin">
            {!user ? (
              <Route index element={<LoginAdmin setUser={setUser} />} />
            ) : (
              <Route index element={<AdminDashboard />} />
            )}
            <Route path="*" element={<div>No page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
