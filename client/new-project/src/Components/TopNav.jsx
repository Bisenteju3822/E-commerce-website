import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-2xl font-bold tracking-wide">
          <Link
            to="/"
            className="text-green-400 hover:text-green-300 px-3 py-2 rounded-md transition duration-300 no-underline"
          >
            RespawnX
          </Link>
        </div>

        <div className="flex space-x-8 text-lg font-medium">
          <Link
            to="/"
            className="text-yellow-400 hover:text-yellow-300 px-3 py-2 rounded-md transition duration-300 no-underline"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-green-400 hover:text-green-300 px-3 py-2 rounded-md transition duration-300 no-underline"
          >
            About
          </Link>
          <Link
            to="/registration"
            className="text-red-400 hover:text-red-300 px-3 py-2 rounded-md transition duration-300 no-underline"
          >
            Registration
          </Link>
          <Link
            to="/addfav"
            className="text-red-400 hover:text-red-300 px-3 py-2 rounded-md transition duration-300 no-underline"
          >
            Search
          </Link>
          <Link
            to="favpage"
            className="text-red-400 hover:text-red-300 px-3 py-2 rounded-md transition duration-300 no-underline"
          >
            Favourite 💖
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
