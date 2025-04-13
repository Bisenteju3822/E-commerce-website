import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Hom from "./Pages/Home";
import AdminDashBoard from "./Admin/AdminDashboard";
import AddGameProduct from "./Admin/AddGameProduct";
import GamingCart from "./Pages/CartData";
import Checkout from "./Pages/Check";
import Registration from "./Pages/Registration";
import ShowGameProduct from "./Admin/ShowGameProduct";
import { ToastContainer } from "react-toastify";
import CustomerOrder from "./Admin/CustomerORder";
import ManageGameProduct from "./Admin/ManageProduct";
import FavCart from "./Pages/FavData";
const App = () => {
  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Hom />} />
            <Route path="cartdata" element={<GamingCart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="registration" element={<Registration />} />
            <Route path="favdata" element={<FavCart />} />
          </Route>
        </Routes>
        <Routes>
          <Route path="admindashboard" element={<AdminDashBoard />}>
            <Route path="addgameproduct" element={<AddGameProduct />} />
            <Route path="showgameproduct" element={<ShowGameProduct />} />
            <Route path="getcustomerorder" element={<CustomerOrder />} />
            <Route path="manageproduct" element={<ManageGameProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
