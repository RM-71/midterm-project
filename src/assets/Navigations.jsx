import { useNavigate } from "react-router-dom";
import { useAuth } from "./sec&storage/AuthContext";

export default function Nav() {
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate("/", { replace: true });
    } else {
      login();
      navigate("/Home", { replace: true });
    }
  };

  // NOTE: Nav always renders (so it can't "disappear")
  return (
    <nav className="bg-transparent fixed w-full top-0 left-0 z-50 text-white pt-3">
      <div className="flex items-center justify-between max-w-full py-2 px-4">
        <div onClick={() => navigate(isLoggedIn ? "/Home" : "/")} className="ml-2 text-xl font-bold cursor-pointer">
          StudySpot
        </div>
        <ul className="flex items-center space-x-6">
          {isLoggedIn && (
            <>
              <li><button onClick={() => navigate("/Home")} className="py-2">Home</button></li>
              <li><button onClick={() => navigate("/Bookings")} className="py-2">Bookings</button></li>
            </>
          )}
          <li>
            <button
              onClick={handleAuthClick}
              className="px-3 py-2 bg-[#273F2C] text-white rounded hover:bg-[#586F6B] transition"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
