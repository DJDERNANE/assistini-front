/** @format */

import React, { useRef, useState } from "react";
import Footer from "../layout/Footer";

import NavbarWelcome from "../layout/NavbarWelcome";
import AboutUsSection from "../components/sections/AboutUsSection";
import BannerSection from "../components/sections/BannerSection";
import PartnerSection from "../components/sections/PartnerSection";
import HeroSection from "../components/sections/HeroSection";

const WelcomePrestateurPage = () => {
    return (
        <div className="">
            <HeroSection isMedecin sign />

            {/* <Footer /> */}
        </div>
    );
};

export default WelcomePrestateurPage;
