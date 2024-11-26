import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { login, loginWithToken } from "services/authServices";
import { toast } from "react-toastify";

const AuthContext = createContext({});

const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [customer, setCustomer] = useState(null);
  const [tokenCustomer, setTokenCustomer] = useState(
    localStorage.getItem("tokenCustomer") || ""
  );
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading

  const navigate = useNavigate();
  const location = useLocation();

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

  const loginCustomer = async (data) => {
    try {
      const response = await login(data.username, data.password);
      // console.log(response);
      if (response.data) {
        if (response.data.user) {
          toast.success(response.data.message);
          setCustomer(response.data.user);
          setTokenCustomer(response.data.token);
          localStorage.setItem("tokenCustomer", response.data.token);
          localStorage.setItem("customer", JSON.stringify(response.data.user));
          navigate("/");
          return;
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const logOutCustomer = () => {
    setCustomer(null);
    setTokenCustomer("");
    localStorage.removeItem("tokenCustomer");
    localStorage.removeItem("customer");
    navigate("/user-login");
  };

  const loadUserFromLocal = async () => {
    try {
      //get user from local storage
      const token = localStorage.getItem("token") || "";
      let data = await loginWithToken(token);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setToken(data.token);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // navigate("/login");
        //neu location la dashboard thi moi chuyen ve login
        if (location.pathname.includes("/dashboard")) {
          navigate("/login");
        }
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const loadCustomerFromLocal = async () => {
    try {
      const tokenCheck = localStorage.getItem("tokenCustomer") || "";
      let data = await loginWithToken(tokenCheck);
      if (data.token) {
        localStorage.setItem("tokenCustomer", data.token);
        localStorage.setItem("customer", JSON.stringify(data.user));
        setCustomer(data.user);
        setTokenCustomer(data.token);
      } else {
        localStorage.removeItem("tokenCustomer");
        localStorage.removeItem("customer");
        if (location.pathname.includes("/dashboard")) {
          navigate("/user-login");
        }
      }
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setIsLoading(false); // Hoàn tất tải
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await loadUserFromLocal();
        await loadCustomerFromLocal();
      } catch (error) {
        console.log(error);
      }
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        tokenCustomer,
        customer,
        loginAction,
        logOut,
        loginCustomer,
        logOutCustomer,
        isLoading,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext); //tra ve value cua authcontext
};
