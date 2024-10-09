<<<<<<< HEAD
import './App.css';
import LoginPage from './routes/LoginPage';
import NoPage from './routes/NoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./routes/LoginAdmin";
import AdminDashboard from "./routes/AdminDashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { login } from "./services/authServices";
>>>>>>> 42d2f1e75b191583fac2b1a9036344717e9bb04d

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
<<<<<<< HEAD
          <Route path="/">
            <Route index element={<LoginPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
=======
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
>>>>>>> 42d2f1e75b191583fac2b1a9036344717e9bb04d
    </>
  );
}

export default App;
