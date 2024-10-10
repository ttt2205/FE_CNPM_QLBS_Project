import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
  const auth = useAuth();
  return (
    <div className="d-flex fs-6">
      <img
        src="https://via.placeholder.com/30"
        alt="profile"
        width={30}
        height={30}
        className="my-auto me-2"
      />
      <div className="d-flex flex-column justity-content-center align-items-start mx-2">
        <p className="my-0">{auth.user.username}</p>
        <p className="my-0">{auth.user.role.role_name}</p>
      </div>
    </div>
  );
};

export default UserProfile;
