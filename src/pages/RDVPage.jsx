import React from "react";
import Navbar from "../layout/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { Icons } from "../constants";
import SearchForm from "../components/form/SearchForm";
import CircleButton from "../components/ui/CircleButton";
import NavbarMobile from "../layout/NavbarMobile";
import NotificationBox from "../layout/NotificationBox";

const RDVPage = () => {
  return (
    <div>
      <Navbar>
        <div className="col-span-9 md:grid grid-cols-12">
          <div className="col-span-6 hidden md:flex justify-end items-center">
            <ul className="pl-2 flex w-full items-center justify-center mr-8 space-x-10 hidden ">
              <li className="capitalize cursor-pointer navLinkStyle">
                <NavLink to="/home">
                  <img src={Icons.Home} alt="icon home" />
                </NavLink>
              </li>
              <li className="capitalize cursor-pointer navLinkStyle">
                <NavLink to="/home">
                  <img src={Icons.Home} alt="icon home" />
                </NavLink>
              </li>
              <li className="capitalize cursor-pointer navLinkStyle">
                <NavLink to="/home">
                  <img src={Icons.Home} alt="icon home" />
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-span-6 flex items-center justify-between md:space-x-10 h-full">
            <SearchForm />
            <div className="flex items-center justify-end space-x-4 w-fit">
              <CircleButton
                icon={Icons.Chat}
                name={"icon chat"}
                onClick={null}
              />
            </div>
          </div>
        </div>
      </Navbar>
      <NavbarMobile />

      <div className="px-8 mt-4 pb-8">
        <Outlet />
      </div>
    </div>
  );
};

export default RDVPage;
