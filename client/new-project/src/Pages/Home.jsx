import AdvertisingSlides from "./AdvertisingSlide";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Base_URL from "../config/BaseUrl";
import { addtoCart } from "../CartSlice";
import { addtoFav } from "../FavSlice"; // Import favorite action
import { useDispatch } from "react-redux";
import { MyContext } from "../LoginContext";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";

const Hom = () => {
  const [mydata, setMydata] = useState([]);
  const dispatch = useDispatch();
  const { logedIn, setLoggedIn, setUname, setUemail } = useContext(MyContext);

  const customerAunthenticate = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      let api = `${Base_URL}customer/userauthenticate`;

      try {
        const response = await axios.get(api, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        localStorage.setItem("username", response.data.name);
        localStorage.setItem("useremail", response.data.email);
        localStorage.setItem("userid", response.data._id);
        localStorage.setItem("userLogedin", true);
        setLoggedIn(true);
        setUname(localStorage.getItem("username"));
        setUemail(localStorage.getItem("useremail"));
      } catch (error) {
        console.error("User authentication failed:", error);
      }
    }
  };

  const loadData = async () => {
    const api = `${Base_URL}admin/showgameproduct`;
    try {
      const response = await axios.get(api);
      setMydata(response.data);
      toast.success("You are properly authorized for that later.");
    } catch (error) {
      console.error(error);
      toast.error("Could not load game products. Please try again later.");
    }
  };

  useEffect(() => {
    loadData();
    customerAunthenticate();
  }, []);

  return (
    <>
      <div
        className="bg-cover bg-center h-[400px] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: "url('fatal-fury-city-of-3840x2160-21455.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-3xl font-bold">
            🔥 Discover the Ultimate Gaming Deals!
          </h1>
          <p className="mt-2 text-lg">
            Dive into the world of gaming with our premium collection of games,
            accessories, and exclusive deals.
          </p>
          <button className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg">
            Explore Now
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div
        className="bg-gray-100 min-h-screen flex flex-wrap justify-center gap-6 p-5"
        style={{
          backgroundImage: "url('iron-tank-doom-3840x2160-20796.jpg')",
        }}
      >
        {mydata.map((key) => (
          <div
            key={key._id}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4"
          >
            <img
              className="w-full h-64 object-cover"
              src={
                key.defaultImage
                  ? `${Base_URL}${key.defaultImage}`
                  : "/default-placeholder.jpg"
              }
              alt={key.name}
            />
            <div className="px-6 py-4">
              <h3 className="text-xl font-bold">{key.title}</h3>
              <p className="text-gray-700 text-sm">{key.description}</p>
              <p className="text-gray-600 font-semibold">{key.genre}</p>
              <p className="text-gray-600">{key.platform}</p>
              <p className="text-lg font-bold text-indigo-600">₹{key.price}</p>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              {/* Add to Cart Button */}
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() =>
                  dispatch(
                    addtoCart({
                      id: key._id,
                      title: key.title,
                      description: key.description,
                      genre: key.genre,
                      platform: key.platform,
                      price: key.price,
                      defaultImage: key.defaultImage,
                      images: key.images,
                      qnty: 1,
                    })
                  )
                }
              >
                Add to Cart
              </button>

              {/* Favorite Heart Icon */}
              <FaHeart
                className="text-red-500 cursor-pointer hover:text-red-700 text-2xl ml-4"
                onClick={() =>
                  dispatch(
                    addtoFav({
                      id: key._id,
                      title: key.title,
                      description: key.description,
                      genre: key.genre,
                      platform: key.platform,
                      price: key.price,
                      defaultImage: key.defaultImage,
                      images: key.images,
                    })
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
      <AdvertisingSlides />
      {/* Gaming Bundles Section */}
      <div
        className="bg-cover bg-center h-[350px] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: "url(sonic-racing-3840x2160-21707.jpg)",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-3xl font-bold">💥 Exclusive Gaming Bundles</h1>
          <p className="mt-2 text-lg">
            Save big with our carefully curated gaming bundles.
          </p>
          <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
            View Bundles
          </button>
        </div>
      </div>
      {/* Featured Games Section */}
      <div
        className="bg-cover bg-center h-[350px] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: "url(split-fiction-key-3840x2160-21053.jpeg)",
        }}
      >
        <h1 className="text-center text-4xl font-bold mb-6">
          🎮 Featured Games
        </h1>
      </div>
    </>
  );
};

export default Hom;
