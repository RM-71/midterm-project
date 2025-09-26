import { useNavigate } from "react-router-dom";
import { useAuth } from "./sec&storage/AuthContext";

export default function Nav() {
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate("/"); // go back to login page
    } else {
      login();
      navigate("/Home"); // go to home after login
    }
  };

  return (
    <nav className="bg-transparent fixed w-full top-0 left-0 z-50 text-white pt-3">
      <div className="flex items-center justify-between max-w-full py-2">
        <div className="ml-10 text-xl font-bold">StudySpot</div>
        <ul className="flex items-center space-x-10 font-medium mr-5">
          {isLoggedIn && (
            <>
              <li>
                <button onClick={() => navigate("/Home")} className="py-2">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/Bookings")} className="py-2">
                  Booking
                </button>
              </li>
            </>
          )}
          <li>
            <button
              onClick={handleAuthClick}
              className="px-3 py-2 bg-[#273F2C] text-white rounded hover:bg-[#586F6B] transition duration-300 font-medium border-none"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
