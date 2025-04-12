import { useSelector, useDispatch } from "react-redux";
import Base_URL from "../config/BaseUrl";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { qntyIncrease, qntyDecrease, productRemove } from "../CartSlice";
import { MdDelete } from "react-icons/md";
import { HiDocumentCurrencyRupee } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GamingCart = () => {
  const Products = useSelector((state) => state.mycart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let totalAmount = 0;

  const handleIncrease = (id) => {
    dispatch(qntyIncrease({ id }));
    toast.success("Quantity increased!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleDecrease = (id) => {
    dispatch(qntyDecrease({ id }));
    toast.info("Quantity decreased!", { position: toast.POSITION.TOP_CENTER });
  };

  const handleRemove = (id) => {
    dispatch(productRemove({ id }));
    toast.error("Product removed from cart.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const renderedProducts = Products.map((game, index) => {
    totalAmount += game.price * game.qnty;
    return (
      <tr
        key={game.id}
        className="hover:bg-gray-100 border-b border-gray-300 text-center"
      >
        <td className="py-2 px-4">{index + 1}</td>
        <td className="py-2 px-4">
          <img
            src={`${Base_URL}${game.defaultImage}`}
            alt={game.name}
            className="w-20 h-16 rounded-md shadow-md"
          />
        </td>
        <td className="py-2 px-4">{game.title}</td>
        <td className="py-2 px-4">{game.platform}</td>
        <td className="py-2 px-4">{game.genre}</td>
        <td className="py-2 px-4 text-green-600 font-semibold">
          <HiDocumentCurrencyRupee /> {game.price}
        </td>
        <td className="py-2 px-4 flex justify-center items-center">
          <FaMinusSquare
            className="text-red-500 cursor-pointer hover:text-red-600 transition-all"
            onClick={() => handleDecrease(game.id)}
          />
          <span className="mx-2 font-bold">{game.qnty}</span>
          <FaPlusSquare
            className="text-green-500 cursor-pointer hover:text-green-600 transition-all"
            onClick={() => handleIncrease(game.id)}
          />
        </td>
        <td className="py-2 px-4 text-green-600 font-semibold">
          <HiDocumentCurrencyRupee /> {game.price * game.qnty}
        </td>
        <td className="py-2 px-4">
          <MdDelete
            className="text-red-500 cursor-pointer hover:text-red-600 transition-all"
            onClick={() => handleRemove(game.id)}
          />
        </td>
      </tr>
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🕹️ My Gaming Cart
      </h1>

      {/* Total Price */}
      <h4 className="text-lg font-semibold text-center mb-6 text-blue-600">
        Total Price: <HiDocumentCurrencyRupee /> {totalAmount}
      </h4>

      {/* Checkout Button */}
      <div className="flex justify-end mx-auto max-w-5xl mb-6">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Products Table */}
      <div className="container mx-auto px-4 max-w-5xl">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Game Cover</th>
              <th className="py-2 px-4">Game Title</th>
              <th className="py-2 px-4">Platform</th>
              <th className="py-2 px-4">Genre</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Total</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>{renderedProducts}</tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default GamingCart;
