import { useState } from "react";
import axios from "axios";
import Base_URL from "../config/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddGameProduct = () => {
  const [input, setInput] = useState({});
  const [image, setImage] = useState("");

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
    console.log(input);
  };

  const handleImage = (e) => {
    setImage(e.target.files);
    console.log(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${Base_URL}admin/addgameproduct`;
    const formData = new FormData();

    for (let key in input) {
      formData.append(key, input[key]);
    }

    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }

    try {
      const response = await axios.post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      toast.success("Game added successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add game. Please try again.", {});
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
            Add New Game Product 🎮
          </h2>

          {/* Game Title */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Game Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Game Description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Game Genre */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Genre
            </label>
            <select
              name="genre"
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Select Genre</option>
              <option value="Action">Action</option>
              <option value="RPG">RPG</option>
              <option value="Shooter">Shooter</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>

          {/* Game Platform */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Platform
            </label>
            <select
              name="platform"
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Select Platform</option>
              <option value="PC">PC</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Xbox">Xbox</option>
              <option value="Nintendo">Nintendo</option>
            </select>
          </div>

          {/* Game Price */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              type="text"
              name="price"
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Upload Image */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Game Cover
            </label>
            <input
              type="file"
              multiple
              onChange={handleImage}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddGameProduct;
