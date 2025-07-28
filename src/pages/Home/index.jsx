import React from "react";
import Navar from "../../components/Navbar/index";
import Banner from "../../components/Banner/index";
import TypesOfTherpies from "../../components/TypesOfTherpies/index";
import WhyDrPsych from "../../components/WhyDrPsych/index";
import HowItWorks from "../../components/HowItWorks/index";
import Footer from "../../components/Footer/index";
import Faqs from "../../components/Faqs/index";
import BookAnAppointment from "../../components/BookAnAppointment/index";

const Home = () => {
  return (
    <div>
      <TypesOfTherpies />
      <Banner />
      <HowItWorks />
      <BookAnAppointment />
      <WhyDrPsych />
      <Faqs />
      <Footer />
    </div>
  );
};

export default Home;
