import { useState, useEffect } from "react";
import axios from "axios";
import Base_URL from "../config/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const [input, setInput] = useState({
    name: "",
    address: "",
    city: "",
    contact: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (
      !input.name ||
      !input.address ||
      !input.city ||
      !input.contact ||
      !input.email ||
      !input.password
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        `${Base_URL}customer/registration`,
        input
      );
      console.log(response.data);
      toast.success("Registration successful!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
            User Registration 🎮
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Name *
            </label>
            <input
              type="text"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleInput}
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Address *
            </label>
            <input
              type="text"
              name="address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleInput}
            />
          </div>

          {/* City */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter City *
            </label>
            <input
              type="text"
              name="city"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleInput}
            />
          </div>

          {/* Contact */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Contact *
            </label>
            <input
              type="text"
              name="contact"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleInput}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Email *
            </label>
            <input
              type="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleInput}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleInput}
            />
          </div>

          <ToastContainer />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Registration;
