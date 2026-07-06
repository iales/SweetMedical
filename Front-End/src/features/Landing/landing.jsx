import "./landing.css";
import React, {useEffect} from "react";
import HeaderLanding from "../../components/HeaderLanding/headerLanding"; 
import InformationLanding from "../../components/InformationLanding/informationLanding";
import FooterLanding from "../../components/FooterLanding/footerLanding";

const Landing = () => {
   useEffect(() => {
    document.title = "Sweet Medical"; 
  }, []);

  return (
     <div className="landing-container">
      <div className="landing-content">
        <HeaderLanding />
        <InformationLanding />
      </div>
      <FooterLanding />
    </div>
  );
}

export default Landing;