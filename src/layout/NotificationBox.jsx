import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import CircleButton from "../components/ui/CircleButton";
import { Icons, Images } from "../constants";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const NotificationBox = () => {
  const { t } = useTranslation("global");

  const navigate = useNavigate();

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          {/* <p>trif</p> */}
          <div className="relative cursor-pointer">
            <CircleButton
              icon={Icons.Notification}
              name={"icon notification"}
              onClick={null}
            />
            <p className="absolute right-0 top-0 bg-rose-600 text-white font-medium text-xs rounded-full w-4 h-4 flex items-center justify-center">
              4
            </p>
          </div>
        </PopoverTrigger>
        <PopoverContent width={250} borderRadius={20}>
          <PopoverArrow />
          <PopoverHeader
            paddingX={0}
            borderBottom={0}
            className="text-zinc-900 text-sm font-semibold capitalize"
          >
            <p className="pl-5 pt-2">{t("navbar.notification")}</p>
          </PopoverHeader>
          <PopoverBody paddingX={0}>
            <ul className="mb-3 pl-5 pr-3">
              {[1, 2, 3, 4, 5, 6, 7].map((item, idx) => (
                <li className="flex items-center space-x-3 p-2" key={idx}>
                  <img
                    src={Images.Test}
                    alt=""
                    className="w-8 h-8 object-cover rounded-full"
                  />
                  <p className="text-zinc-900 text-sm !no-underline">
                    Lorem, ipsum dolor.
                  </p>
                </li>
              ))}
            </ul>
            <p
              className="text-xs text-center cursor-pointer font-semibold hover:text-blue-600 border-t pt-2 first-letter:capitalize"
              onClick={() => {
                navigate("/home/notifications");
              }}
            >
              {t("notification.go")}
            </p>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationBox;
