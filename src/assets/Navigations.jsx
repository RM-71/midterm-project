import { useNavigate } from "react-router-dom";
import { useAuth } from "./sec&storage/AuthContext";

export default function Nav() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-transparent fixed w-full top-0 left-0 z-50 text-white pt-3">
      <div className="flex items-center justify-between max-w-full py-2">
        <div className="ml-10 text-xl font-bold">StudySpot</div>
        <ul className="flex items-center space-x-10 font-medium mr-5">
          {user && (
            <>
              <li>
                <button onClick={() => navigate("/home")} className="py-2">
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/dashboard/my-bookings")}
                  className="py-2"
                >
                  Bookings
                </button>
              </li>
            </>
          )}
          <li>
            {!user ? (
              <button
                onClick={() => {
                  login("student");
                  navigate("/home");
                }}
                className="px-3 py-2 bg-[#273F2C] text-white rounded hover:bg-[#586F6B] transition duration-300 font-medium border-none"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-3 py-2 bg-[#273F2C] text-white rounded hover:bg-[#586F6B] transition duration-300 font-medium border-none"
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
