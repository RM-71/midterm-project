import { useNavigate } from "react-router-dom";
import { useAuth } from "./sec&storage/AuthContext";

export default function Log_in() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/Home");
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="h-screen bg-[url('/Background_Nature.jpg')] bg-cover bg-[60%_70%] bg-no-repeat">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center space-y-6 flex-col px-5">
          <h1 className="text-7xl font-bold font-dancing-script">
            Find Your Perfect Study Spot
          </h1>
          <p className="text-xl font-roboto-flex">
            Explore inspiring spaces designed to help you stay focused and motivated
          </p>
        </div>
      </div>
    </div>
  );
}
