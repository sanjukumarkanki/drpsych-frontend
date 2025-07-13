import React from "react";
import Navbar from "../../components/Navbar"; // ✅ fixed import name
import Banner from "../../components/Banner";
import TypesOfTherpies from "../../components/TypesOfTherpies";
import WhyDrPsych from "../../components/WhyDrPsych";
import HowItWorks from "../../components/HowItWorks";
import Footer from "../../components/Footer";
import Faqs from "../../components/Faqs";
import BookAnAppointment from "../../components/BookAnAppointment";

const Home = () => {
  return (
    <>
      <Banner />
      <TypesOfTherpies />
      <HowItWorks />
      <BookAnAppointment />
      <WhyDrPsych />
      <Faqs />
      <Footer />
    </>
  );
};

export default Home;
