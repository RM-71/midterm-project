import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./sec&storage/AuthContext";

export default function Log_in() {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  // redirect to Home if already logged in (useEffect avoids navigate-in-render warning)
  useEffect(() => {
    if (isLoggedIn) navigate("/Home", { replace: true });
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    login();
    navigate("/Home", { replace: true });
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="h-screen bg-[url('/Background_Nature.jpg')] bg-cover bg-[60%_70%] bg-no-repeat">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center space-y-6 flex-col px-5">
          <h1 className="text-6xl font-bold">Find Your Perfect Study Spot</h1>
          <p className="text-xl">Explore inspiring spaces designed to help you stay focused and motivated</p>
        </div>
      </div>
    </div>
  );
}
