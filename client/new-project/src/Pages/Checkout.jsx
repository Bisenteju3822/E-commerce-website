import { useEffect, useContext, useState } from "react";
import { MyContext } from "../LoginContext";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Base_URL from "../config/BaseUrl";
import { useNavigate } from "react-router-dom";
import { cartEmpty } from "../CartSlice";
import { ToastContainer, toast } from "react-toastify";

const CheckOut = () => {
  const { logedIn } = useContext(MyContext);
  const [cusData, setCusData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Ensure the user is logged in and load customer data
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("userLogedin");
    if (!isUserLoggedIn) {
      navigate("/"); // Redirect to login if not logged in
    } else {
      loadData();
    }
  }, [navigate]);

  // Fetch customer data
  const loadData = async () => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      toast.error("User ID missing. Please log in again.");
      navigate("/"); // Redirect if userId is missing
      return;
    }

    const api = `${Base_URL}customer/getdata?userid=${userId}`;
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use token if available
        },
      });
      setCusData(response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      toast.error("Failed to load customer data. Please try again.");
    }
  };

  const Product = useSelector((state) => state.mycart.cart);

  let totalAmount = 0;
  let productsName = "";
  let imgURL = "";

  const ans = Product.map((key, index) => {
    totalAmount += key.price * key.qnty;
    productsName += key.name + ", ";
    if (index === 0) {
      imgURL = `${Base_URL}${key.defaultImage}`;
    }
    return (
      <tr key={key.id}>
        <td>
          <img
            src={`${Base_URL}${key.defaultImage}`}
            width="80"
            height="60"
            alt={key.name}
          />
        </td>
        <td>{key.title}</td>
        <td>{key.description}</td>
        <td>{key.genre}</td>
        <td>₹{key.platform}</td>
        <td>₹{key.price}</td>
        <td>{key.qnty}</td>
        <td>₹{key.price * key.qnty}</td>
      </tr>
    );
  });

  // Handle empty cart case
  if (!Product.length) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#ff5733" }}>
        <h4 style={{ fontWeight: "bold", fontSize: "22px" }}>
          Oops! Your cart is empty 🚀
        </h4>
        <p style={{ fontSize: "18px", color: "#555" }}>
          Add some amazing items and make your checkout experience exciting!
        </p>
        <Button
          onClick={() => navigate("/home")}
          style={{
            backgroundColor: "#ff5733",
            border: "none",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Start Shopping Now!
        </Button>
      </div>
    );
  }

  const initPay = (data) => {
    const options = {
      key: "rzp_test_oWLUkrVaoJLWU0",
      amount: data.amount,
      currency: data.currency,
      name: productsName,
      description: "Test Payment",
      image: imgURL,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL = "http://localhost:8000/api/payment/verify";
          const verifyResponse = await axios.post(verifyURL, response, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
            },
          });
          console.log("Payment Verified:", verifyResponse.data);
          toast.success("Payment Successful!");
        } catch (error) {
          console.error("Payment Verification Error:", error);
          toast.error("Payment verification failed. Please contact support.");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePay = async () => {
    try {
      const orderURL = "http://localhost:8000/api/payment/orders";
      const { data } = await axios.post(orderURL, {
        amount: totalAmount,
        customername: cusData.name,
        address: cusData.address,
        contact: cusData.contact,
        email: cusData.email,
      });
      console.log("Order Data:", data);
      initPay(data.data);
      dispatch(cartEmpty()); // Clear cart on successful payment
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 align="center" style={{ color: "#3366cc", marginBottom: "20px" }}>
        Your Checkout Page
      </h1>

      <div
        style={{
          margin: "0 auto",
          maxWidth: "800px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Game Title</th>
              <th>Genre</th>
              <th>Description</th>
              <th>Platform</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>{ans}</tbody>
        </Table>

        <h4 align="center" style={{ color: "green", marginTop: "20px" }}>
          Your Total Payable Amount: ₹{totalAmount}
        </h4>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ fontSize: "18px" }}>
            <strong>Customer Name:</strong> {cusData.name}
          </p>
          <p style={{ fontSize: "18px" }}>
            <strong>Shipping Address:</strong> {cusData.address}
          </p>
          <p style={{ fontSize: "18px" }}>
            <strong>Contact No:</strong> {cusData.contact}
          </p>
          <p style={{ fontSize: "18px" }}>
            <strong>Email:</strong> {cusData.email}
          </p>
          <Button
            onClick={handlePay}
            style={{
              backgroundColor: "#3366cc",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "10px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Pay Now!
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckOut;
