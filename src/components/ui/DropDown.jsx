/** @format */

import React, { useState } from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    useDisclosure,
} from "@chakra-ui/react";
import { Icons } from "../../constants";
import { useTranslation } from "react-i18next";

const DropDown = ({
    title,
    icon,
    name,
    data = [],
    isLoading = false,
    children,
    value,
    setValue,
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [search, setSearch] = useState("");

    const { t } = useTranslation("global");

    const handleChoose = (id) => {
        setValue(id);
        onClose();
    };

    const findItem = data?.find((item) => item.id == value);

    return (
        <div className="w-full h-full">
            {title && (
                <p className="text-zinc-900 text-xs md:text-sm font-normal capitalize mb-1">
                    {title}
                </p>
            )}

            <div className="">
                <Menu isOpen={isOpen} onClose={onClose}>
                    <MenuButton className="w-full h-full" onClick={onOpen}>
                        <div className="flex items-center justify-between rounded-lg h-full border border-gray-600 bg-transparent px-4 py-3">
                            <div className="flex items-center space-x-2 w-[80%]">
                                <img src={icon} alt={`icon ${title}`} />
                                <p className="text-zinc-800 text-sm md:text-base font-normal capitalize truncate">
                                    {value && findItem ? findItem.name : name}
                                </p>
                            </div>
                            <img src={Icons.ArrowDown} alt="icon arrow down" />
                        </div>
                    </MenuButton>
                    <MenuList className="!p-4 shadow w-full block relative !z-50">
                        <input
                            type="text"
                            name=""
                            id=""
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={t("filter.search")}
                            className="px-4 py-2 outline-none bg-white rounded-lg shadow border border-zinc-300 mb-4 w-full"
                        />
                        <div className="max-h-[200px] overflow-y-auto">
                            {isLoading
                                ? "loading..."
                                : search
                                ? data
                                      .filter((item) =>
                                          item.name
                                              .toLowerCase()
                                              .includes(search.toLowerCase())
                                      )
                                      .map((item) => (
                                          <Options
                                              key={item.id}
                                              item={item}
                                              handle={() =>
                                                  handleChoose(item.id)
                                              }
                                          />
                                      ))
                                : data.map((item) => (
                                      <Options
                                          key={item.id}
                                          item={item}
                                          handle={() => handleChoose(item.id)}
                                      />
                                  ))}
                        </div>
                        {children && <div className="mt-4">{children}</div>}
                    </MenuList>
                </Menu>
            </div>
            {/* {openMenu && (
        <div className="mt-4 p-4 rounded-lg border border-gray-500">
          <input
            type="text"
            name=""
            id=""
            placeholder={t("filter.search")}
            className="px-4 py-2 outline-none bg-white rounded-lg shadow border border-zinc-300 mb-4 w-full"
          />
          {children ? children : <Options />}
        </div>
      )} */}
        </div>
    );
};

export default DropDown;

const Options = ({ item, handle }) => {
    if (!item) return null;
    return (
        <option
            value={item.id}
            className="cursor-pointer hover:bg-gray-100 py-2"
            onClick={handle}
        >
            {item.name}
        </option>
    );
};
