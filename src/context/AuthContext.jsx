import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { login } from "services/authServices";
import { toast } from "react-toastify";

const AuthContext = createContext({});

const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await login(data.username, data.password);
      console.log(response);
      if (response.data) {
        if (response.data.user) {
          toast.success(response.data.message);
          setUser(response.data.user);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/dashboard");
          return;
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext); //tra ve value cua authcontext
};
