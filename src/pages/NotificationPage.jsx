import React from "react";
import { useTranslation } from "react-i18next";
import SearchForm from "../components/form/SearchForm";
import NotificationBox from "../layout/NotificationBox";
import CircleButton from "../components/ui/CircleButton";
import NavbarMobile from "../layout/NavbarMobile";
import { Icons, Images } from "../constants";
import { NavLink } from "react-router-dom";
import Navbar from "../layout/Navbar";
const NotificationPage = () => {
  const { t } = useTranslation("global");

  return (
    <div>
      <div className="bg-white rounded p-4 border-b">
        <h1 className="mb-2 font-semibold text-xl capitalize">
          {t("notification.title")}
        </h1>
        <SearchForm />
      </div>
      <div className="bg-white rounded px-4 border-b">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div className={`${item < 10 && "border-b"} pb-2 pt-2 px-4`}>
            <ItemNoti key={item} item={null} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;

const ItemNoti = ({ item }) => {
  return (
    <div className="grid grid-cols-6 relative w-full gap-x-3 px-2">
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-600"></div>
      <div className="flex items-center">
        <img
          src={Images.RDV2}
          alt=""
          className="w-11 h-11 rounded-full object-cover"
        />
      </div>
      <div className="col-span-5">
        <div className="flex items-center justify-between">
          <h5 className="font-medium">Lorem, ipsum.</h5>
          <p className="text-[#3c3c4399] text-sm">9:40 PM</p>
        </div>
        <p className="text-[#3c3c4399] text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
          nihil.
        </p>
      </div>
    </div>
  );
};
