import React from "react";
import Header from "components/user/Header";
import Footer from "components/user/Footer";
import HomePage from "components/user/HomePageUser";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="page-wrapper m-auto">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Home;
