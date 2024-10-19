import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { login, loginWithToken } from "services/authServices";
import { toast } from "react-toastify";

const AuthContext = createContext({});

const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await login(data.username, data.password);
      // console.log(response);
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

  const loadUserFromLocal = async (token) => {
    try {
      //get user from local storage
      const json = localStorage.getItem("user") || "";
      const token = localStorage.getItem("token") || "";
      const user = JSON.parse(json);
      if (user && token) {
        setUser(user);
        setToken(token);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    let isEffectRan = false; //ngan chay nhieu lan

    if (!isEffectRan) {
      try {
        loadUserFromLocal();
      } catch (error) {
        console.log(error);
      }
    }

    return () => {
      isEffectRan = true;
    };
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
