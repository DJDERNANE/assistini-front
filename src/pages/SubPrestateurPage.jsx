/** @format */

import React, { useRef, useState } from "react";
import Footer from "../layout/Footer";

import NavbarWelcome from "../layout/NavbarWelcome";
import AboutUsSection from "../components/sections/AboutUsSection";
import BannerSection from "../components/sections/BannerSection";

import PartnerSection from "../components/sections/PartnerSection";
import HeroSection from "../components/sections/HeroSection";
import SubAdminLoginSection from "../components/sections/SubAdminLoginSection";

const SubPrestateurPage = () => {
    return (
        <div className="bg-[#F7F7F7]">
            <NavbarWelcome hide />
            {/* <NavbarMobile /> */}

            <SubAdminLoginSection />

            <Footer />
        </div>
    );
};

export default SubPrestateurPage;
