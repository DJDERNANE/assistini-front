import React from "react";
import { useNavigate } from "react-router";
import images from "../constants/images";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex items-center justify-center">
        <img src={images.NotFound} alt="404-Scarecrow" className="w-[400px]" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-4xl mb-3">I have bad news for you</h2>
        <p className="text-lg">
          The page you are looking for might be removed or is temporarily
          unavailable
        </p>
        <button
          className="mt-10 bg-blue-600 rounded-lg px-4 py-2 text-white"
          onClick={() => navigate("/prestateur/rdvs")}
        >
          Back to homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
