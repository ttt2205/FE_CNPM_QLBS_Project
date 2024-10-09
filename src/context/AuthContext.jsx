import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const AuthContext = createContext({});

//fake db
const users = [
  {
    username: "truong@gmail.com",
    password: "123",
    id: "123",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huIERvZSIsImlkIjoiMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.TEDz5eMTTXgm6qRhgVxDHw3P9yyp7fgSwG78eIlHgrQ",
    role: "user",
  },
  {
    username: "admin@gmail.com",
    password: "123",
    id: "123",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huIERvZSIsImlkIjoiMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.TEDz5eMTTXgm6qRhgVxDHw3P9yyp7fgSwG78eIlHgrQ",
    role: "admin",
  },
];

function findUser({ username, password }) {
  return users.find(
    (user) => user.username == username && user.password == password
  );
}

const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      // const response = await fetch('your-api-endpoint/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });

      //fake fetch
      let response = {};
      let user = findUser(data);
      if (user) {
        response = {
          data: {
            user: {
              username: user.username,
              id: user.id,
              role: user.role,
            },
          },
          token: user.token,
        };
      } else {
        response = {
          message: "Wrong username or password",
        };
      }

      // const res = await response.json();
      const res = response;
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
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
