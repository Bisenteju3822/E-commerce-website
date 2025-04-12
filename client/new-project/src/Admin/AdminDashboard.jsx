import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  FaPlus,
  FaTools,
  FaBox,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa"; // Icons
import "tailwindcss/tailwind.css"; // Make sure Tailwind CSS is configured

const AdminDashBoard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-indigo-600 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold flex items-center text-pink-400">
            <FaUserShield className="mr-2" /> 🎮 Gaming
            <span className="text-white ml-1"> RespawnX Dashboard</span>
          </h1>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="bg-indigo-200 py-3 shadow-md text-center">
        <p className="text-lg font-semibold">
          Welcome,{" "}
          <span className="text-indigo-800">
            {localStorage.getItem("admin")}
          </span>
          !
          <button
            onClick={logout}
            className="text-red-600 ml-4 hover:underline flex items-center justify-center"
          >
            <FaSignOutAlt className="mr-1" /> Logout
          </button>
        </p>
      </div>

      {/* Dashboard Layout */}
      <div className="flex flex-row">
        {/* Left Menu */}
        <nav className="w-1/4 bg-gray-800 text-white p-5">
          <ul className="space-y-4">
            <li>
              <button
                className="flex items-center space-x-3 w-full bg-gray-700 p-3 rounded hover:bg-gray-600"
                onClick={() => navigate("addgameproduct")}
              >
                <FaPlus /> <span>Add New Game</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center space-x-3 w-full bg-gray-700 p-3 rounded hover:bg-gray-600"
                onClick={() => navigate("manageproduct")}
              >
                <FaTools /> <span>Manage Games</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center space-x-3 w-full bg-gray-700 p-3 rounded hover:bg-gray-600"
                onClick={() => navigate("getcustomerorder")}
              >
                <FaBox /> <span>Customer Orders</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center space-x-3 w-full bg-gray-700 p-3 rounded hover:bg-gray-600"
                onClick={() => navigate("showgameproduct")}
              >
                <FaBox /> <span>showgameproduct</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Content Area */}
        <main className="w-3/4 bg-white p-5 shadow-inner">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashBoard;
