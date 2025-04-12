import { useEffect, useState } from "react";
import axios from "axios";
import Base_URL from "../config/BaseUrl";

const ManageGameProduct = () => {
  const [mydata, setMydata] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    platform: "",
    price: "",
  });

  // Load data from API
  const loadData = async () => {
    let api = `${Base_URL}admin/showgameproduct`;
    try {
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete an item
  const handleDelete = async (id) => {
    let api = `${Base_URL}admin/deletegameproduct/${id}`;
    try {
      await axios.delete(api);
      loadData(); // Refresh data
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle edit initialization
  const handleEdit = (item) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      genre: item.genre,
      platform: item.platform,
      price: item.price,
    });
  };

  // Handle update (edit functionality)
  const handleUpdate = async (id) => {
    let api = `${Base_URL}admin/updategameproduct/${id}`;
    try {
      await axios.put(api, formData);
      setEditItem(null);
      loadData(); // Refresh data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <h1 className="text-2xl font-bold text-center mb-6">
        Manage Game Products
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
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
            <div className="px-6 py-4 space-y-2">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleEdit(key)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleDelete(key._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {editItem && (
        <div className="bg-white shadow-md rounded p-6 mt-10">
          <h2 className="text-xl font-bold mb-4">Edit Product</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Genre:
              </label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Platform:
              </label>
              <input
                type="text"
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price:
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleUpdate(editItem._id)}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageGameProduct;
