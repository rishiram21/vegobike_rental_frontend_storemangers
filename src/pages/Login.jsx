import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from '../api/apiConfig';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Entrance animation effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Clear any existing invalid token
    localStorage.removeItem('token');

    try {
      const response = await apiClient.post('/store-manager/login', {
        email,
        password
      }, {
        headers: {
          Authorization: undefined // Explicitly remove auth header
        }
      });

      localStorage.setItem("token", response.data.token);
      setIsLoading(false);

      // Success animation before redirect
      setIsVisible(false);
      setTimeout(() => {
        // Redirect with state to prevent browser back button issues
        navigate("/dashboard", { replace: true });
      }, 300);
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";

      if (error.response) {
        const serverError = error.response.data;
        // Handle JWT expiration specifically
        if (serverError.message?.includes('JWT expired')) {
          errorMessage = "Session expired. Please login again.";
        } else {
          errorMessage = serverError.message || errorMessage;
        }
      }

      setError(errorMessage);
      setIsLoading(false);

      // Shake animation for error
      const form = document.getElementById("login-form");
      form.classList.add("animate-shake");
      setTimeout(() => {
        form.classList.remove("animate-shake");
      }, 500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
         style={{
           backgroundImage: "url('/okbikes_admin.jpg')",
           backgroundBlendMode: "overlay",
           backgroundColor: "rgba(0, 0, 0, 0.6)",
         }}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 z-0"></div>

      <div
        className={`w-full max-w-md p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-lg transition-all duration-500 transform z-10
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Store Manger Login
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md border-l-4 border-red-500 animate-fadeIn">
            <div className="flex">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
              </svg>
              {error}
            </div>
          </div>
        )}

        <form id="login-form" onSubmit={handleLogin} className="space-y-6">
          <div className="transition-all duration-300 transform delay-100">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="email"
                className="w-full pl-10 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="transition-all duration-300 transform delay-200">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="password"
                className="w-full pl-10 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 text-white font-medium rounded-lg transition-all duration-300 text-center
              ${isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" fill="none" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
