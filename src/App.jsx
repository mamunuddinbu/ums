import { Link, Outlet, useNavigate } from "react-router-dom"; // Updated import
import { useContext } from "react";
import { AuthContext } from "../src/main"; // Import the AuthContext

function App() {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  console.log(loggedIn);
  const style = "hover:bg-blue-700 px-3 py-2 rounded-md text-lg";

  const handleLogout = () => {
    console.log("test");
    localStorage.removeItem("authToken");
    setLoggedIn(false);
    navigate("/login");  // Programmatically navigate to the login page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 shadow-md flex place-items-center">
        <div className="flex ml-48">
          <Link to="/home" className={style}>
            Home
          </Link>
          <Link to="/students" className={style}>
            Students
          </Link>
          <Link to="/teachers" className={style}>
            Teachers
          </Link>
          <Link to="/about" className={style}>
            About
          </Link>
          <div className="px-3 py-2 rounded-md text-lg">
            {loggedIn && (
              <div>
                <Link to="/profile">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center absolute top-2 border-8 border-blue-600 border-solid">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src="../public/1.jpg"
                      alt=""
                    />
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className="bg-slate-600 flex items-center justify-center rounded-2xl ml-48">
            {loggedIn ? (
              <button
                className="hover:bg-blue-300 px-3 py-2 rounded-md text-lg"
                onClick={handleLogout}
              >
                LogOut
              </button>
            ) : (
              <Link to="/login" className={style}>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="p-6 bg-slate-200">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
