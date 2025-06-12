import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import icons from "../../../../constants/icons";

const OptionCard = ({ icon, title, description, onClick }) => {
    const { t } = useTranslation("note");

    return (
        <Card borderRadius={"xl"} shadow={"sm"}>
            <CardBody className="flex flex-col justify-center items-center">
                <img src={icons[icon]} alt="" className="w-24 h-24" />
                <h3 className="first-letter:capitalize font-medium text-center">
                    {title}
                </h3>
                {/* <p className="text-center font-light first-letter:capitalize text-sm">
          {description}
        </p> */}
            </CardBody>
            <CardFooter className="!pt-0">
                <button
                    className="text-white first-letter:capitalize rounded-full text-sm mx-auto w-[100px] py-2 bg-primary-100"
                    onClick={onClick}
                >
                    {t("general.see")}
                </button>
            </CardFooter>
        </Card>
    );
};

export default OptionCard;
