import React from "react";
import Header from "components/user/Header";
import Footer from "components/user/Footer";
import HomePage from "components/user/HomePageUser";
const Home = () => {
  return (
    <>
      <div className="page-wrapper ">
        <Header />
        <main className="flex-fill">
          <HomePage />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
