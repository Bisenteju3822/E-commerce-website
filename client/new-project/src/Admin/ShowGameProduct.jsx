import { useEffect, useState } from "react";
import axios from "axios";
import Base_URL from "../config/BaseUrl";
import { addtoCart } from "../CartSlice";
//import { addToFavorite, emptyFavorites } from "../FavoriteSlice"; // Import favorite actions
import { useDispatch } from "react-redux";
import { FaHeart, FaRegTrashAlt } from "react-icons/fa"; // Import trash icon for clearing favorites

const ShowGameProduct = () => {
  const [mydata, setMydata] = useState([]);
  const dispatch = useDispatch();

  const loadData = async () => {
    let api = `${Base_URL}admin/showgameproduct`;
    try {
      const response = await axios.get(api);
      console.log(response.data);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddToCart = (item) => {
    // Dispatch the action to add to cart
    dispatch(
      addtoCart({
        id: item._id,
        title: item.title,
        description: item.description,
        genre: item.genre,
        platform: item.platform,
        price: item.price,
        defaultImage: item.defaultImage,
        images: item.images,
        qnty: 1,
      })
    );

    // Show Toastify success notification
    toast.success(`${item.title} has been added to your cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section for Clear Favorites */}
      <div className="flex justify-end p-4">
        <button
          className="flex items-center bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded"
          onClick={() => dispatch(emptyFavorites())}
        >
          <FaRegTrashAlt className="mr-2" />
          Clear Favorites
        </button>
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center gap-6 p-5">
        {mydata.map((key) => (
          <div
            key={key._id}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4"
          >
            <img
              className="w-full h-64 object-cover"
              src={`${Base_URL}${key.defaultImage}`}
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
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-1/2"
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
              <FaHeart className="text-red-500 cursor-pointer hover:text-red-700 text-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowGameProduct;
