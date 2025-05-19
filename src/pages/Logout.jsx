import { useNavigate } from "react-router-dom";
import apiClient from '../api/apiConfig';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Attempt server logout first
      await apiClient.post("/logout", {}, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // If using Bearer token
        }
      });
      
      // Clear client-side storage
      localStorage.removeItem("token");
      sessionStorage.removeItem("sessionData"); // If using sessionStorage
      
      // Force full page reload to clear all application state
      window.location.href = "/";
    } catch (error) {
      // console.error("Logout failed:", error);
      // Fallback cleanup if server unavailable
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
    >
      Logout
    </button>
  );
};

export default Logout;