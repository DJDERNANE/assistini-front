/** @format */

import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Icons, Images } from "../../constants";
import CustomButton from "../custom/CustomButton";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CircleButton from "../ui/CircleButton";
import CallendarRdv from "../ui/CallendarRdv";
import images from "../../constants/images";
import { useToggleFavorite } from "../../hooks/useProviderService";

const CardMedecin = ({
    medecin,
    select = false,
    favorite = false,
    refetch = () => {},
}) => {
    const {
        id,
        fullName,
        specialtyName,
        address,
        phone,
        cabinName,
        disponibilities,
    } = medecin;
    const navigate = useNavigate();
    const { t } = useTranslation("search");

    const handleRdv = () => {
        navigate("/doctors/" + id);
    };

    const {
        register,
        handleSubmit,
        loading,
        onSubmit,
        reset,
        message,
        error,
        setMessage,
        setValue,
        watch,
    } = useToggleFavorite(refetch);

    const handleFavorite = () => {
        
        handleSubmit(onSubmit({ provider_id: medecin.id }));
    };

    return (
        <div className="relative h-fit !w-full group">
            <Card  onClick={handleRdv}
                borderRadius={"xl"}
                className={`overflow-hidden ${
                    select && "!border-blue-500 !border"
                }`}
            >
                <CardBody className="grid grid-cols-5 gap-4 !p-0 md:!p-4">
                    <div className="flex items-start space-x-4 col-span-4 md:col-span-2 p-3 md:p-0 relative !z-30">
                        <div className="bg-blue-500 bg-opacity-25 w-[100px] rounded-lg overflow-hidden h-24">
                            <img
                                src={images.Indique}
                                alt={`image ${fullName}`}
                                className="w-full h-full rounded-xl object-cover"
                            />
                        </div>
                        <div className="w-[150px]">
                            <h4
                                className="text-green-700 text-sm md:text-base font-medium"
                                onClick={handleRdv}
                            >
                                {fullName}
                            </h4>
                            <p className="text-zinc-600 text-xs md:text-sm font-normal capitalize">
                                {specialtyName ?? "(vide)"}
                            </p>
                            <p className="text-slate-400 text-xs md:text-sm font-normal md:w-[350px] md:mt-2">
                                {address}
                            </p>
                            <p className="text-zinc-600 text-xs md:text-sm font-normal md:mt-2 md:mb-2">
                                {cabinName}
                            </p>
                            <div className="hidden md:block">
                                <CustomButton
                                    name={t("search.bookRDV")}
                                    onClick={handleRdv}
                                    css="w-full hidden md:block"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full col-span-1 md:col-span-3">
                        <div className="hidden md:block">
                            <CallendarRdv data={disponibilities ?? []} />
                        </div>
                        <div className="bg-blue-600 text-white capitalize text-[8px] w-full h-full flex items-center justify-center md:hidden">
                            <p>{t("doctor.available")}</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
            {localStorage.getItem("accessToken") && (
                <div className="absolute -left-12 top-0 hidden group-hover:block">
                    <div className="pr-8">
                        <Card borderRadius={"lg"}>
                            <CardBody className="!px-0 !py-2">
                                <CircleButton
                                    icon={
                                        favorite ? Icons.StarFill : Icons.Star
                                    }
                                    name={"icon favorite"}
                                    cssIcon="!w-[20px] !md:w-4 !h-[20px] !md:h-4"
                                    onClick={handleFavorite}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardMedecin;
