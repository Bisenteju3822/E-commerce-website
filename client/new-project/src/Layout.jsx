import Footer from "./Components/Footer";
import Header from "./Components/Header";
import TopNav from "./Components/TopNav";
import { Outlet } from "react-router-dom";

const Layout = ({ games }) => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Layout;
