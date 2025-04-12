import { useState, useContext } from "react";
import { RiAdminFill } from "react-icons/ri";
import { FaShoppingCart, FaUser, FaHeart, FaSearch } from "react-icons/fa";
import Base_URL from "../config/BaseUrl";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { MyContext } from "../LoginContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Header = ({ games = [] }) => {
  // State for Admin Login
  const [adminid, setAdminid] = useState("");
  const [password, setPassword] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);

  // State for User Login
  const [cusEmail, setCusEmail] = useState("");
  const [cusPassword, setCusPassword] = useState("");
  const [showUser, setShowUser] = useState(false);

  // State for Search Modal
  const [showSearch, setShowSearch] = useState(false);

  // Global state using Context
  const { loggedIn, setLoggedIn, uname, uemail, setUname, setUemail } =
    useContext(MyContext);

  // Redux state for cart
  const Product = useSelector((state) => state.mycart.cart);
  const Favourite = useSelector((state) => state.myfav.Fav);
  const ProLength = Product.length;
  const ProLen = Favourite.length;
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  // Admin Login Handler
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Base_URL}admin/adminlogin`, {
        adminid,
        password,
      });
      messageApi.success(response.data.msg);
      setShowAdmin(false);
      localStorage.setItem("admin", response.data.Admin.name);
      navigate("/admindashboard");
    } catch (error) {
      messageApi.error(error.response?.data?.msg || "Admin login failed!");
    }
  };

  // Customer Login Handler
  const customerLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Base_URL}customer/custlogin`, {
        email: cusEmail,
        password: cusPassword,
      });
      localStorage.setItem("token", response.data.token);
      setShowUser(false);
      setLoggedIn(true);
      setUname(response.data.uname);
      setUemail(response.data.uemail);
      navigate("/");
      messageApi.success("Login Successful!");
    } catch (error) {
      messageApi.error(error.response?.data?.msg || "Customer login failed!");
    }
  };

  // Logout Handler
  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.clear();
      setUname("");
      setUemail("");
      setLoggedIn(false);
      navigate("/");
      messageApi.info("Logged out successfully!");
    }
  };

  return (
    <>
      {contextHolder}
      {/* Header Section */}
      <div className="flex justify-between items-center bg-gray-800 p-4 text-white">
        <div className="flex items-center">
          <img src={"logo.jpg"} alt="Logo" className="w-20 h-12" />
        </div>

        <div className="flex items-center space-x-6">
          <FaSearch
            className="cursor-pointer hover:text-gray-400"
            onClick={() => setShowSearch(true)}
            alt="Search"
          />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("favdata");
            }}
            className="flex items-center space-x-2 cursor-pointer"
            alt="Cart"
          >
            <FaHeart />
            <span>{ProLen}</span>
          </a>

          <FaUser
            onClick={() => setShowUser(true)}
            className="cursor-pointer hover:text-gray-400"
            alt="User Login"
          />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("cartdata");
            }}
            className="flex items-center space-x-2 cursor-pointer"
            alt="Cart"
          >
            <FaShoppingCart />
            <span>{ProLength}</span>
          </a>
          <RiAdminFill
            onClick={() => setShowAdmin(true)}
            className="cursor-pointer hover:text-gray-400"
            alt="Admin Login"
          />

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              User Info
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Welcome: {uname}</Dropdown.Item>
              <Dropdown.Item>Email: {uemail}</Dropdown.Item>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Search Modal */}
      <Modal show={showSearch} onHide={() => setShowSearch(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search Games</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="all" id="game-tabs" className="mb-3">
            <Tab eventKey="all" title="All">
              <GameList data={games} />
            </Tab>
            <Tab eventKey="pc" title="PC">
              <GameList data={games.filter((game) => game.platform === "PC")} />
            </Tab>
            <Tab eventKey="playstation" title="PlayStation">
              <GameList
                data={games.filter((game) => game.platform === "PlayStation")}
              />
            </Tab>
            <Tab eventKey="nintendo" title="Nintendo">
              <GameList
                data={games.filter((game) => game.platform === "Nintendo")}
              />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>

      {/* Admin Login Modal */}
      <Modal show={showAdmin} onHide={() => setShowAdmin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdminSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Admin ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Admin ID"
                value={adminid}
                onChange={(e) => setAdminid(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* User Login Modal */}
      <Modal show={showUser} onHide={() => setShowUser(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={customerLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={cusEmail}
                onChange={(e) => setCusEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={cusPassword}
                onChange={(e) => setCusPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const GameList = ({ data }) => {
  return (
    <div>
      {data.length > 0 ? (
        data.map((game) => (
          <div key={game.id} className="p-2 border rounded mb-2">
            <h4>{game.title}</h4>
            <p>{game.platform}</p>
            <p>{game.genre}</p>
          </div>
        ))
      ) : (
        <p>No games available</p>
      )}
    </div>
  );
};

export default Header;
