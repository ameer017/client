import React from "react";
import "./Home.scss";
import Companies from "../Companies/Companies";
import Hero from "../Hero/Hero";
import GetStarted from "../GetStarted/GetStarted";
import Header from "../Header/Header";
import Value from "../Value/Value";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      {/* <section className="hero">
        <div className="hero-text">
          <h2>find your perfect dream house.</h2>
          <SearchLocation/>
          <p>Get started by choosing one of the latest and featured properties</p>
          
          <div className="hero-buttons --flex-start">
            <button className="--btn --btn-danger">
              <Link to={"/register"}>get started</Link>
            </button>
          </div>
        </div>

       
      </section> */}
      <div className="home">
        <div>
          <div className="white-gradient" />
          <Header />
          {/* <Header/> */}
          <Hero />
        </div>
    </div>
      <Companies />
      <Value/>
      <GetStarted/>
      <Contact/>
      <Footer/>
    </>
  );
};

export default Home;
