/** @format */

import React, { useRef, useState } from "react";
import Footer from "../layout/Footer";

import NavbarWelcome from "../layout/NavbarWelcome";
import AboutUsSection from "../components/sections/AboutUsSection";
import BannerSection from "../components/sections/BannerSection";
import PartnerSection from "../components/sections/PartnerSection";
import HeroSection from "../components/sections/HeroSection";
import HowSection from "../components/sections/HowSection";
import EdgeSection from "../components/sections/EdgeSection";
import UnlockSection from "../components/sections/UnlockSection";
import AppSection from "../components/sections/AppSection";
import FeedbackSection from "../components/sections/FeedbackSection";
import QuestionSection from "../components/sections/QuestionSection";
import OfferSection from "../components/sections/OfferSection";
import SponsorSection from "../components/sections/SponsorSection";
import EffortSection from "../components/sections/EffortSection";
import ExperienceSection from "../components/sections/ExperienceSection";

const WelcomePage = () => {
    return (
        <div className="bg-[#F4F5EE]">
            {/* <NavbarWelcome /> */}
            {/* <NavbarMobile /> */}

            <HeroSection />
            <AboutUsSection />
            <BannerSection />
            <HowSection />
            <EdgeSection />
            <ExperienceSection />
            <EffortSection />
            <UnlockSection />
            {/* <SponsorSection /> */}
            <AppSection />
            {/* <FeedbackSection /> */}
            <QuestionSection />
            <OfferSection />

            {/* footer  */}
            <Footer />
        </div>
    );
};

export default WelcomePage;
